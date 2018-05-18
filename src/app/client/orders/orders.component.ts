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
import { DeliveryInfoModalComponent } from '../../modals/delivery-info-modal/delivery-info-modal.component';
import { CreateOrderModalComponent } from '../../modals/create-order-modal/create-order-modal.component';
import { EditOrderModalComponent } from '../../modals/edit-order-modal/edit-order-modal.component';
import { ModalHelperService } from '../../modals/modal-helper.service';
import { DispatchesInfoModalComponent } from '../../modals/dispatches-info-modal/dispatches-info-modal.component';
import { CreateDeliveryModalComponent } from '../../modals/create-delivery-modal/create-delivery-modal.component';
import { EditDeliveryModalComponent } from '../../modals/edit-delivery-modal/edit-delivery-modal.component';

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
        private modalService: NgbModal,
        private modalHelper: ModalHelperService
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

    public showOrderInfo(order: any): void {
        const modalRef = this.modalService.open(OrderInfoModalComponent);
        modalRef.componentInstance.order = order;
    }

    public showDeliveryInfo(order: any): void {
        const modalRef = this.modalService.open(DeliveryInfoModalComponent);
        modalRef.componentInstance.order = order;
    }

    public showDispatchesInfo(order: any): void {
        const modalRef = this.modalService.open(DispatchesInfoModalComponent, {
            size: 'lg'
        });

        modalRef.componentInstance.order = order;
    }

    public showEditOrderModal(order: any): void {
        const modalRef = this.modalService.open(EditOrderModalComponent);
        modalRef.componentInstance.order = order;

        modalRef.result
            .then(() => {
                this.handleOrders(this.page, this.needle.value);
            }, () => {});
    }

    public openCreateOrderModal(): void {
        const modalRef = this.modalService.open(CreateOrderModalComponent);

        modalRef.result
            .then(() => {
                this.handleOrders(this.page, this.needle.value);
            }, () => {});
    }

    public showCreateDeliveryModal(order: any): void {
        const modalRef = this.modalService.open(CreateDeliveryModalComponent);
        modalRef.componentInstance.order = order;

        modalRef.result
            .then(() => {
                this.handleOrders(this.page, this.needle.value);
            }, () => {});
    }

    public showEditDeliveryModal(order: any): void {
        const modalRef = this.modalService.open(EditDeliveryModalComponent);
        modalRef.componentInstance.order = order;

        modalRef.result
            .then(() => {
                this.handleOrders(this.page, this.needle.value);
            }, () => {});
    }

    public removeOrder(order: any): void {
        this.modalHelper.openConfirmModal({
            title: 'Are you sure?',
            text: 'Do you want to remove this order permanently?',
            icon: 'fa fa-question'
        })
            .then(() => {
                this.loader.show();

                this.ordersService.remove(order)
                    .subscribe(status => {
                        if (!status) {
                            this.alert.error('Something went wrong...');
                            this.loader.hide();
                        } else {
                            this.alert.success('Order has been removed');
                            this.handleOrders(this.page, this.needle.value);
                        }
                    }, () => {
                        this.loader.hide();
                    });
            }, () => {});
    }

    public removeDelivery(order: any): void {
        this.modalHelper.openConfirmModal({
            title: 'Are you sure?',
            text: 'Do you want to remove this delivery permanently?',
            icon: 'fa fa-question'
        })
            .then(() => {
                this.loader.show();

                this.ordersService.removeDelivery(order)
                    .subscribe(status => {
                        if (!status) {
                            this.alert.error('Something went wrong...');
                            this.loader.hide();
                        } else {
                            this.alert.success('Delivery has been removed');
                            this.handleOrders(this.page, this.needle.value);
                        }
                    }, () => {
                        this.loader.hide();
                    });
            }, () => {});
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
