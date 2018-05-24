import { Component, OnInit } from '@angular/core';
import { CreateDeliveryModalComponent } from '../create-delivery-modal/create-delivery-modal.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../services/alert.service';
import {OrdersService} from '../../services/orders.service';

@Component({
    selector: 'app-edit-delivery-modal',
    templateUrl: '../create-delivery-modal/create-delivery-modal.component.html',
    styleUrls: ['../create-delivery-modal/create-delivery-modal.component.scss']
})
export class EditDeliveryModalComponent extends CreateDeliveryModalComponent implements OnInit {

    public isEditing: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        protected ordersService: OrdersService,
        protected alert: AlertService
    ) {
        super(activeModal, ordersService, alert);

        this.isEditing = true;
        this.title = 'Editing delivery';
        this.buttonValue = 'Save';
    }

    ngOnInit() {
        this.showLoader();
        this.fetchDeliveryDetails();
    }

    protected save() {

        this.showLoader();

        const deliveryData = this.deliveryData.getJSONData();

        this.ordersService.editDelivery(deliveryData)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Error editing delivery, check typed data...', true);
                    this.hideLoader();
                } else {
                    this.alert.success('Delivery has been edited...', true);
                    this.hideLoader();
                    this.activeModal.close();
                }
            });
    }

    public isValidData(): boolean {
        return this.deliveryData.isValidEditionData();
    }

    private fetchDeliveryDetails(): void {
        this.ordersService.fetchDeliveryDetails(this.order)
            .subscribe(data => {
                if (data instanceof Object) {
                    this.deliveryData.setDataFromDelivery(data);

                    this.hideLoader();
                } else {
                    this.alert.error('Something went wrong...', true);
                    this.activeModal.close();
                }
            });
    }
}
