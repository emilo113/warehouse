import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { routes } from './routes';
import { UserType } from '../models/enums/user.types';
import { users } from '../const/users';

@Injectable()
export class UsersService {

    public users = [];
    public count: number = 0;

    constructor(
        private http: HttpClient
    ) {}

    public fetchUsers (page: number = 1, needle: string = '') {
        const limit = users.limit;
        const offset = (page - 1) * limit;

        let params: HttpParams = new HttpParams();

        params = params.append('offset', offset.toString());
        params = params.append('limit', limit.toString());

        if (needle.length > 0) {
            params = params.append('needle', needle);
        }

        return this.http.get<any>(routes.account.fetchAll, {params: params})
            .map(data => {
                if (data instanceof Object) {
                    this.users = data.listOfUsers;
                    this.count = data.numberOfUsers;
                    return true;
                }

                return false;
            });
    }

    public register(userData) {
        let route;

        if (Number(userData.Role) === UserType.Client) {
            route = routes.account.registerClient;
        } else {
            route = routes.account.registerUser;
        }

        return this.http.post<any>(route, userData)
            .map(data => {
                if (data && data.status) {
                    return true;
                }

                return false;
            });
    }

    public edit(userData) {
        let route;

        if (Number(userData.Role) === UserType.Client) {
            route = routes.account.editClient;
        } else {
            route = routes.account.editUser;
        }

        return this.http.post<any>(route, userData)
            .map(data => {
                if (data && data.status) {
                    return true;
                }

                return false;
            });
    }

    public remove(user) {
        let params: HttpParams = new HttpParams();
        params = params.append('userId', user.id);

        return this.http.get<any>(routes.account.remove, {params: params})
            .map(data => {
                if (data && data.status) {
                    return true;
                }

                return false;
            });
    }


}
