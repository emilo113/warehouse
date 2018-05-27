import { Component, Input, OnInit } from '@angular/core';
import { AbstractModal } from '../abstract-modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../services/orders.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-delivery-info-modal',
    templateUrl: './delivery-info-modal.component.html',
    styleUrls: ['./delivery-info-modal.component.scss']
})
export class DeliveryInfoModalComponent extends AbstractModal implements OnInit {

    @Input() order: any;

    public deliveryDetails: any;

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
        this.ordersService.fetchDeliveryDetails(this.order)
            .subscribe(data => {
                if (data instanceof Object) {
                    this.deliveryDetails = data;
                    this.hideLoader();
                } else {
                    this.alert.error('Coś poszło nie tak');
                    this.activeModal.close();
                }
            }, () => { this.activeModal.close(); });
    }

}
