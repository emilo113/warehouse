import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    private API_URL: string = 'http://jbieniasz-001-site1.itempurl.com/api';

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({ url: `${this.API_URL}/${req.url}` });
        return next.handle(apiReq);
    }
}
