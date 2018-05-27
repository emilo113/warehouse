import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {AbstractModal} from '../abstract-modal';
import {OrdersService} from '../../services/orders.service';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-order-info-modal',
    templateUrl: './order-info-modal.component.html',
    styleUrls: ['./order-info-modal.component.scss']
})
export class OrderInfoModalComponent extends AbstractModal implements OnInit {
    @Input() order: any;

    public orderDetails: any;

    constructor(
        public activeModal: NgbActiveModal,
        private ordersService: OrdersService,
        private alert: AlertService
    ) {
        super(activeModal);
    }

    ngOnInit() {
        this.showLoader();
        this.fetchInfo();
    }

    private fetchInfo(): void {
        this.ordersService.fetchOrderDetails(this.order)
            .subscribe(data => {
                if (data instanceof Object) {
                    this.orderDetails = data;
                    this.hideLoader();
                } else {
                    this.alert.error('Coś poszło nie tak');
                    this.activeModal.close();
                }
            }, () => this.activeModal.close());
    }
}
