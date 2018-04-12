import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()

export class UserService {

    public USER_TYPES = {
        client: 1,
        admin: 2,
        superAdmin: 3
    };

    constructor() { }

}
