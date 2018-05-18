import { Component, Input, OnInit } from '@angular/core';
import { CreateOrderModalComponent } from '../create-order-modal/create-order-modal.component';

@Component({
    selector: 'app-edit-order-modal',
    templateUrl: '../create-order-modal/create-order-modal.component.html',
    styleUrls: ['../create-order-modal/create-order-modal.component.scss']
})
export class EditOrderModalComponent extends CreateOrderModalComponent implements OnInit {
    @Input() order: any;

    public isEditing: boolean = true;
    public title: string = 'Editing order...';
    public buttonValue: string = 'Save';

    ngOnInit() {
        this.showLoader();
        this.handleRole();
        this.fetchOrderData();
    }

    public save(): void {
        this.showLoader();

        const orderData = this.orderData.getJSONData();

        this.ordersService.edit(orderData)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Error editing order, check typed data...', true);
                    this.hideLoader();
                } else {
                    this.alert.success('Order has been edited...');
                    this.hideLoader();
                    this.activeModal.close();
                }
            });
    }

    isValidData(): boolean {
        return this.orderData.isValidEditingData();
    }

    protected handleRole() {
        if (this.user.isLevelAdmin()) {
            this.otherOrderer = true;
            this.isUserData = false;
        } else {
            this.otherOrderer = true;
        }
    }

    private fetchOrderData() {
        this.ordersService.fetchOrderDetails(this.order)
            .subscribe(orderData => {
                const fullOrder = Object.assign({}, this.order, orderData);
                this.orderData.setDataFromOrder(fullOrder);
                this.hideLoader();
            });
    }
}
