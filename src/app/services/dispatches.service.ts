import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { dispatches } from '../const/dispatches';
import { Observable } from 'rxjs/Observable';
import { routes } from '../api/routes';

@Injectable()
export class DispatchesService {

    public dispatches = [];
    public count: number = 0;

    constructor(
        private http: HttpClient
    ) { }

    public fetchDispatches(page: number = 1, needle: string = ''): Observable<any> {
        const limit = dispatches.limit;
        const offset = (page - 1) * limit;

        let params: HttpParams = new HttpParams();

        params = params.append('offset', offset.toString());
        params = params.append('limit', limit.toString());

        if (needle && needle.length > 0) {
            params = params.append('needle', needle);
        }

        return this.http.get<any>(routes.dispatches.fetchAll, {params: params})
            .map(data => {
                if (data instanceof Object) {
                    this.dispatches = data.listOfDispatches;
                    this.count = data.numberOfDispatches;
                    return true;
                }

                return false;
            });
    }

    public fetchDispatchDetails(dispatch: any): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('dispatchId', dispatch.id);

        return this.http.get<any>(routes.dispatches.fetchDetails, {params: params})
            .map(data => {
                return data;
            });
    }

    public remove(dispatch: any): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('dispatchId', dispatch.id);

        return this.http.get<any>(routes.dispatches.remove, {params: params})
            .map(data => {
                if (data && data.status) {
                    return true;
                }

                return false;
            });
    }

    public create(dispatchData: any, isCmr: boolean): Observable<any> {
        let params: HttpParams = new HttpParams();

        params = params.append('isCMR', isCmr.toString());

        return this.http.post<any>(routes.dispatches.create, dispatchData, {params: params})
            .map(data => {
                return !!(data && data.status);
            });
    }

    public edit(dispatchData: any, isCmr: boolean): Observable<any> {
        let params: HttpParams = new HttpParams();

        params = params.append('isCMR', isCmr.toString());

        return this.http.post<any>(routes.dispatches.edit, dispatchData, {params: params})
            .map(data => {
                if (data && data.status) {
                    return true;
                }

                return false;
            });
    }

    public getDispatchReport(dispatch: any): Observable<any> {
        let params: HttpParams = new HttpParams();

        params = params.append('ifSendEmail', true.toString());
        params = params.append('dispatchId', dispatch.id.toString());

        return this.http.get<any>(routes.dispatches.downloadDispatchReport, {params: params})
            .map(data => {
                if (typeof data === 'string') {
                    return data;
                }

                return false;
            });
    }

    public getCMRReport(dispatch: any): Observable<any> {
        let params: HttpParams = new HttpParams();

        params = params.append('ifSendEmail', true.toString());
        params = params.append('dispatchId', dispatch.id.toString());

        return this.http.get<any>(routes.dispatches.downloadCMRReport, {params: params})
            .map(data => {
                if (typeof data === 'string') {
                    return data;
                }

                return false;
            });
    }
}
