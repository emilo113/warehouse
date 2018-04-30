import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { routes } from '../api/routes';
import {UserService} from '../services/user.service';
import {Token} from '../models/Token';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient,
        private user: UserService
    ) {}

    public getToken(): Token {
        const token = JSON.parse(localStorage.getItem('token'));

        if (token) {
            this.user.setRole(token.role);
        }

        return token;
    }

    private setToken(token: Token) {
        localStorage.setItem('token', JSON.stringify(token));
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return token !== null && token.expirationDate > (new Date).getTime();
    }

    public signIn (login: string, password: string) {
        return this.http.post<any>(routes.account.login, {login, password})
            .map(data => {
                if (data && data.token) {
                    const token = new Token(data.token, data.expirationTime, data.role);

                    this.setToken(token);
                    this.user.setRole(data.role);
                }

                return data.status;
            });
    }

    public signOut() {
        localStorage.removeItem('token');
    }
}
