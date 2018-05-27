import { Component, Input, OnInit } from '@angular/core';
import { AbstractModal } from '../abstract-modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../services/orders.service';
import { OrderPosition } from '../../models/OrderPosition';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-delivery-positions-modal',
    templateUrl: './delivery-positions-modal.component.html',
    styleUrls: ['./delivery-positions-modal.component.scss']
})

export class DeliveryPositionsModalComponent extends AbstractModal implements OnInit {

    @Input() delivery: any;
    @Input() dispatchBase: any;

    public positions: OrderPosition[];
    public checked: Boolean[];

    constructor(
        public activeModal: NgbActiveModal,
        private ordersService: OrdersService,
        private alert: AlertService
    ) {
        super(activeModal);
        this.positions = [];
    }

    ngOnInit() {
        this.showLoader();
        this.fetchPositions();
    }

    public onPositionStateChange(event: any, index: number): void {
        this.checked[index] = event.target.checked;
    }

    public onChangeAmount(event: any, index: number): void {
        this.positions[index].checkMax(event.target.value);
    }

    public isValidData(): boolean {
        if (this.checked.filter(isChecked => isChecked).length === 0) {
            return false;
        }

        let isValid = true;

        this.checked.forEach((isChecked, index) => {
           if (isChecked && !this.positions[index].isValidForDispatch()) {
               isValid = false;
           }
        });

        return isValid;
    }

    public addPositions(): void {
        const resultPositions = this.positions.filter((position, index) => {
            return this.checked[index];
        });

        this.activeModal.close(resultPositions);
    }

    private fetchPositions(): void {

        const dispatchId = this.dispatchBase ? this.dispatchBase.id : null;

        this.ordersService.getDeliveryState(this.delivery.orderId, dispatchId)
            .subscribe(positions => {
               if (positions) {

                   this.handlePositions(positions);

               } else {
                   this.alert.error('Coś poszło nie tak', true);
                   this.activeModal.dismiss();
               }
            }, () => { this.activeModal.dismiss(); });
    }

    private handlePositions(positions: any[]): void {
        positions.forEach(position => {
            const positionInstance = new OrderPosition();
            positionInstance.setData(position);
            this.positions.push(positionInstance);
        });

        this.checked = new Array(this.positions.length).fill(false);
        this.hideLoader();
    }

}
