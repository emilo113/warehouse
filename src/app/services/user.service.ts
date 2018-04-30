import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {UserType} from '../models/enums/user.types';

@Injectable()

export class UserService {

    private role: number;

    constructor() { }

    public setRole(role: number) {
        this.role = role;
    }

    public getRole(): number {
        return this.role;
    }

    public isClient(): boolean {
        return this.role === UserType.Client;
    }

    public isAdmin(): boolean {
        return this.role === UserType.Admin;
    }

    public isHeadAdmin(): boolean {
        return this.role === UserType.HeadAdmin;
    }

    public isLevelAdmin(): boolean {
        return this.isAdmin() || this.isHeadAdmin();
    }
}
