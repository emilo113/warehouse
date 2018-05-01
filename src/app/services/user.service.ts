import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {UserType} from '../models/enums/user.types';

@Injectable()

export class UserService {

    private role: number;
    private id: number;

    constructor() { }

    public setRole(role: number) {
        this.role = role;
    }

    public getRole(): number {
        return this.role;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id;
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
