import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { routes } from '../api/routes';

import { orders } from '../const/orders';
import {UserType} from '../models/enums/user.types';
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


}
