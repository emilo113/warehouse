import { Component, Input, OnInit } from '@angular/core';
import { CreateDispatchModalComponent } from '../create-dispatch-modal/create-dispatch-modal.component';
import { DispatchesService } from '../../services/dispatches.service';
import { OrdersService } from '../../services/orders.service';
import {NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ModalHelperService } from '../modal-helper.service';
import { AlertService } from '../../services/alert.service';
import {DispatchSet} from '../../models/DispatchSet';
import {OrderPosition} from '../../models/OrderPosition';
import {Observable} from 'rxjs/Observable';
import {NgbDatePlAdapter} from '../../models/utils/NgbDatePlAdapter';
import {NgbDatePlParserFormatter} from '../../models/utils/NgbDatePlParserFormatter';

@Component({
    selector: 'app-edit-dispatch-modal',
    templateUrl: '../create-dispatch-modal/create-dispatch-modal.component.html',
    styleUrls: ['../create-dispatch-modal/create-dispatch-modal.component.scss'],
    providers: [{
        provide: NgbDateAdapter,
        useClass: NgbDatePlAdapter
    }, {
        provide: NgbDateParserFormatter,
        useClass: NgbDatePlParserFormatter
    }]
})

export class EditDispatchModalComponent extends CreateDispatchModalComponent implements OnInit {
    @Input() dispatchBase: any;

    public title: string = 'Edycja wydania';
    public buttonValue: string = 'Zapisz';

    public isEditing: boolean = true;

    constructor(
        protected modalHelper: ModalHelperService,
        public activeModal: NgbActiveModal,
        protected ordersService: OrdersService,
        protected modalService: NgbModal,
        protected dispatchesService: DispatchesService,
        protected alert: AlertService
    ) {
        super(modalHelper, activeModal, ordersService, modalService, dispatchesService, alert);
    }

    ngOnInit() {
        this.showLoader();
        this.fetchDispatchDetails();
    }

    public save(): void {
        this.showLoader();

        const data = this.dispatch.getJSONData();

        this.dispatchesService.edit(data, this.isCmr)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Błąd podczas zapisu wydania, sprawdź wprowadzone dane', true);
                    this.hideLoader();
                } else {
                    this.alert.success('Wydanie zostało pomyślnie zapisane');
                    this.hideLoader();
                    this.activeModal.close();
                }
            }, () => { this.hideLoader(); });
    }

    public isValidData(): boolean {
        return this.dispatch.isValidEditingData();
    }

    protected fetchDeliveries(term: string): Observable<any[]> {
        return this.ordersService.fetchDeliveries(term, true, this.dispatchBase.id);
    }

    protected passPropertiesToDeliveryPositionsModal(event: any, modalRef: NgbModalRef): void {
        modalRef.componentInstance.delivery = event.item;
        modalRef.componentInstance.dispatchBase = this.dispatchBase;
    }

    private fetchDispatchDetails() {
        this.dispatchesService.fetchDispatchDetails(this.dispatchBase)
            .subscribe(details => {
                if (!(details instanceof Object)) {
                    this.alert.error('Coś poszło nie tak', true);
                    this.activeModal.dismiss();
                }

                details.listOfDispatchOrders.forEach(order => {
                   const dispatchSet = new DispatchSet();

                   dispatchSet.delivery = {
                       container_Id: order.containerId,
                       delivery_Number: order.delivery_Number,
                       id: order.delivery_Id
                   };

                   dispatchSet.positions = [];

                   order.listOfDispatchPositions.forEach(positionData => {
                      const position = new OrderPosition();
                      position.setData(positionData);

                      dispatchSet.positions.push(position);
                      this.dispatch.dispatchPositions.push(position);
                   });

                   this.dispatchSets.push(dispatchSet);
                });

                this.dispatch.setFromDetails(details);
                this.isCmr = details.isCMR;

                this.hideLoader();

            }, () => { this.activeModal.dismiss(); });
    }
}
