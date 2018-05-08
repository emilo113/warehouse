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
                console.log(data);
                if (data instanceof Object) {
                    this.dispatches = data.listOfDispatches;
                    this.count = data.numberOfDispatches;
                    return true;
                }

                return false;
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

}
