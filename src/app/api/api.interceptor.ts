import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../services/alert.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    private API_URL: string = 'https://www.api.directtransport.eu/api';


    constructor(
        private alert: AlertService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({ url: `${this.API_URL}/${req.url}` });

        return next.handle(apiReq)
            .do((event: HttpEvent<any>) => {}, (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    this.alert.error('Something went wrong', true);
                }
            });
    }
}
