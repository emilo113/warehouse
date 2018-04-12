import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Routes } from '../api/routes';

@Injectable()
export class AuthService {

    constructor(
        private http: HttpClient
    ) {}

    public getToken(): string {
        return localStorage.getItem('token');
    }

    private setToken(token: string) {
        localStorage.setItem('token', token);
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return token !== null;
    }

    public signIn (login: string, password: string) {
        return this.http.post<any>(Routes.account.login, {login, password})
            .map(data => {
                console.log(data);
                if (data && data.token) {
                    this.setToken(data.token);
                }

                return data.status;
            });
    }

    public signOut() {
        localStorage.removeItem('token');
    }
}
