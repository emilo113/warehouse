import { Component, Input, OnInit } from '@angular/core';
import { AbstractModal } from '../abstract-modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../services/orders.service';
import { AlertService } from '../../services/alert.service';
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

    public isATBRequired: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        protected ordersService: OrdersService,
        protected alert: AlertService
    ) {
        super(activeModal);

        this.deliveryData = new Delivery();
        this.title = 'Tworzenie przyjęcia';
        this.buttonValue = 'Utwórz';
    }

    ngOnInit() {
        this.isATBRequired = !Boolean(this.order.atb);
        this.showLoader();
        this.fetchOrderInfo();
    }

    public isValidData(): boolean {
        return this.deliveryData.isValidData(this.isATBRequired);
    }

    private fetchOrderInfo(): void {
        this.ordersService.fetchOrderDetails(this.order)
            .subscribe(data => {
                if (data instanceof Object) {
                    this.deliveryData.order_Id = data.id;
                    this.deliveryData.setDeliveryPositions(data.listOfOrderPositions);

                    this.hideLoader();
                } else {
                    this.alert.error('Coś poszło nie tak', true);
                    this.activeModal.dismiss();
                }
            }, () => { this.activeModal.dismiss(); });
    }

    protected save() {

        this.showLoader();

        const deliveryData = this.deliveryData.getJSONData();

        this.ordersService.createDelivery(deliveryData)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Wystąpił błąd podczas tworzenia przyjęcia, sprawdź wprowadzone dane', true);
                    this.hideLoader();
                } else {
                    this.alert.success('Przyjęcie zostało utworzone pomyślnie', true);
                    this.hideLoader();
                    this.activeModal.close();
                }
            }, () => { this.hideLoader(); });
    }
}
