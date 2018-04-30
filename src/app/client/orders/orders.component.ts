import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { FormControl } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { orderStatuses } from '../../models/enums/order.statuses';
import { orders } from '../../const/orders';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderInfoModalComponent } from '../../modals/order-info-modal/order-info-modal.component';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    public page: number = 1;
    public needle: FormControl = new FormControl();
    public ordersConfig = orders;

    constructor(
        public ordersService: OrdersService,
        public userService: UserService,
        private loader: LoaderService,
        private alert: AlertService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.loader.show();
        this.bindSearchEngine();
        this.handleOrders();
    }

    public pageChange(): void {
        this.loader.show();
        this.handleOrders(this.page);
    }

    public getStatusName(status: number): string {
        return Object.keys(orderStatuses).find(key => orderStatuses[key] === status);
    }

    public showOrderInfo(order): void {
        const modalRef = this.modalService.open(OrderInfoModalComponent);
        modalRef.componentInstance.order = order;
    }

    public isDelivered(order): boolean {
        return order.status !== orderStatuses.Reported;
    }

    private handleOrders(page: number = 1, needle: string = ''): void {
        this.ordersService.fetchOrders(page, needle)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Something went wrong...');
                }

                this.loader.hide();
            }, () => {
                this.loader.hide();
            });
    }

    private bindSearchEngine(): void {
        this.needle.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(
                value => {
                    this.filterOrders(value);
                }
            );
    }

    private filterOrders(needle: string): void {
        this.loader.show();
        this.page = 1;

        this.handleOrders(this.page, needle);
    }

}
