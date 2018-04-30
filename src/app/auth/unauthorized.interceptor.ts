import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private alert: AlertService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => { }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.alert.error('Unauthorized, please sing-in...', true);
                    this.router.navigate(['sign-in']);
                }
            }
        });
    }
}