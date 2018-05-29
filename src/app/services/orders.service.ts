import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { routes } from '../api/routes';

import { orders } from '../const/orders';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrdersService {

    public orders = [];
    public count: number = 0;

    constructor(
        private http: HttpClient
    ) { }

    public fetchOrders(page: number = 1, needle: string = ''): Observable<any> {
        const limit = orders.limit;
        const offset = (page - 1) * limit;

        let params: HttpParams = new HttpParams();

        params = params.append('offset', offset.toString());
        params = params.append('limit', limit.toString());

        if (needle && needle.length > 0) {
            params = params.append('needle', needle);
        }

        return this.http.get<any>(routes.orders.fetchAll, {params: params})
            .map(data => {
                if (data instanceof Object) {
                    this.orders = data.listOfOrders;
                    this.count = data.numberOfOrders;
                    return true;
                }

                return false;
            });
    }

    public fetchDeliveries(needle: string = '', isCreatingDispatch: boolean = false, dispatchId: number = null): Observable<any> {
        let params: HttpParams = new HttpParams();

        if (needle && needle.length > 0) {
            params = params.append('needle', needle);
        }

        if (isCreatingDispatch) {
            params = params.append('isCreatingDispatch', isCreatingDispatch.toString());
        }

        if (dispatchId) {
            params = params.append('dispatchId', dispatchId.toString());
        }

        return this.http.get<any>(routes.deliveries.fetchAll, {params: params})
            .map(data => {
                if (data instanceof Object) {
                    return data.listOfDeliveries;
                }

                return false;
            });
    }

    public getDeliveryState(orderId: number, dispatchId: number = null): Observable<any> {
        let params: HttpParams = new HttpParams();

        params = params.append('orderId', orderId.toString());

        if (dispatchId) {
            params = params.append('dispatchId', dispatchId.toString());
        }

        return this.http.get<any>(routes.deliveries.getDeliveryState, {params: params})
            .map(data => {
                if (data instanceof Array) {
                    return data;
                }

                return false;
            });
    }

    public create(orderData): Observable<any> {

        return this.http.post<any>(routes.orders.create, orderData)
            .map(data => {
                return !!(data && data.status);
            });
    }

    public createDelivery(deliveryData): Observable<any> {

        return this.http.post<any>(routes.deliveries.create, deliveryData)
            .map(data => {
               return !!(data && data.status);
            });
    }

    public fetchOrderDetails(order): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('orderId', order.id);

        return this.http.get<any>(routes.orders.fetchDetails, {params: params})
            .map(data => {
               return data;
            });
    }

    public fetchDeliveryDetails(order): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('orderId', order.id);

        return this.http.get<any>(routes.deliveries.fetchDetails, {params: params})
            .map(data => {
                return data;
            });
    }

    public fetchDispatchesForOrder(order): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('orderId', order.id);

        return this.http.get<any>(routes.dispatches.fetchForOrder, {params: params})
            .map(data => {
                return data;
            });
    }

    public edit(orderData: any): Observable<any> {

        return this.http.post<any>(routes.orders.edit, orderData)
            .map(data => {
                if (data && data.status) {
                    return true;
                }

                return false;
            });
    }

    public editDelivery(deliveryData: any): Observable<any> {

        return this.http.post<any>(routes.deliveries.edit, deliveryData)
            .map(data => {
                if (data && data.status) {
                    return true;
                }

                return false;
            });
    }

    public remove(order: any): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('orderId', order.id);

        return this.http.get<any>(routes.orders.remove, {params: params})
            .map(data => {
                if (data && data.status) {
                    return true;
                }

                return false;
            });
    }

    public removeDelivery(order: any): Observable<any> {
        let params: HttpParams = new HttpParams();

        params = params.append('orderId', order.id);

        return this.http.get<any>(routes.deliveries.remove, {params: params})
            .map(data => {
                if (data && data.status) {
                    return true;
                }

                return false;
            });
    }

    public getDifferenceReport(order: any, reportData: any, sendEmail: boolean): Observable<any> {
        let params: HttpParams = new HttpParams();

        params = params.append('ifSendEmail', sendEmail.toString());
        params = params.append('orderId', order.id.toString());

        return this.http.post<any>(routes.deliveries.downloadDifferentReport, reportData, {params: params})
            .map(data => {
                if (typeof data === 'string') {
                    return data;
                }

                return false;
            });
    }

}
