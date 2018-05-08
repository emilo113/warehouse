import { Component, Input, OnInit } from '@angular/core';
import { AbstractModal } from '../abstract-modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'app-dispatches-info-modal',
    templateUrl: './dispatches-info-modal.component.html',
    styleUrls: ['./dispatches-info-modal.component.scss']
})
export class DispatchesInfoModalComponent extends AbstractModal implements OnInit {

    @Input() order: any;

    public dispatchesDetails: any;

    constructor(
        public activeModal: NgbActiveModal,
        private ordersService: OrdersService
    ) {
        super(activeModal);
    }

    ngOnInit() {
        this.showLoader();
        this.fetchInfo();
    }

    private fetchInfo(): void {
        this.ordersService.fetchDispatchesForOrder(this.order)
            .subscribe(data => {
               this.dispatchesDetails = data;
               this.hideLoader();
            });
    }


}
