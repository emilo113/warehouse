import { Component, Input, OnInit } from '@angular/core';
import { AbstractModal } from '../abstract-modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../services/orders.service';
import { AlertService } from '../../services/alert.service';
import { transportTypes } from '../../models/enums/transport.types';
import {Delivery} from '../../models/Delivery';

@Component({
    selector: 'app-create-delivery-modal',
    templateUrl: './create-delivery-modal.component.html',
    styleUrls: ['./create-delivery-modal.component.scss']
})
export class CreateDeliveryModalComponent extends AbstractModal implements OnInit {

    @Input() order: any;

    public deliveryData: Delivery;
    public title: string;
    public buttonValue: string;
    public transportTypes: any;

    constructor(
        public activeModal: NgbActiveModal,
        protected ordersService: OrdersService,
        protected alert: AlertService
    ) {
        super(activeModal);

        this.deliveryData = new Delivery();
        this.transportTypes = transportTypes;
        this.title = 'Creating delivery';
        this.buttonValue = 'Create';
    }

    ngOnInit() {
        this.showLoader();
        this.fetchOrderInfo();
    }

    public isValidData(): boolean {
        return this.deliveryData.isValidData();
    }

    private fetchOrderInfo(): void {
        this.ordersService.fetchOrderDetails(this.order)
            .subscribe(data => {
                if (data instanceof Object) {
                    this.deliveryData.order_Id = data.id;
                    this.deliveryData.setDeliveryPositions(data.listOfOrderPositions);

                    this.hideLoader();
                } else {
                    this.alert.error('Something went wrong...', true);
                    this.activeModal.close();
                }
            });
    }

    protected save() {

        this.showLoader();

        const deliveryData = this.deliveryData.getJSONData();

        this.ordersService.createDelivery(deliveryData)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Error creating delivery, check typed data...', true);
                    this.hideLoader();
                } else {
                    this.alert.success('Delivery has been created...', true);
                    this.hideLoader();
                    this.activeModal.close();
                }
            });
    }
}
