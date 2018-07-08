import { Component, OnInit } from '@angular/core';
import { Dispatch } from '../../models/Dispatch';
import { ModalHelperService } from '../modal-helper.service';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { OrdersService } from '../../services/orders.service';
import { DeliveryPositionsModalComponent } from '../delivery-positions-modal/delivery-positions-modal.component';
import { AbstractModal } from '../abstract-modal';
import { DispatchSet } from '../../models/DispatchSet';
import { OrderPosition } from '../../models/OrderPosition';
import { DispatchesService } from '../../services/dispatches.service';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-create-dispatch-modal',
    templateUrl: './create-dispatch-modal.component.html',
    styleUrls: ['./create-dispatch-modal.component.scss']
})
export class CreateDispatchModalComponent extends AbstractModal implements OnInit {

    public title: string = 'Tworzenie wydania';
    public buttonValue: string = 'Utwórz';
    public dispatch: Dispatch;
    public dispatchSets: DispatchSet[];

    public activeIds: string[];
    public isCmr: boolean = false;

    constructor(
        protected modalHelper: ModalHelperService,
        public activeModal: NgbActiveModal,
        protected ordersService: OrdersService,
        protected modalService: NgbModal,
        protected dispatchesService: DispatchesService,
        protected alert: AlertService
    ) {
        super(activeModal);

        this.dispatch = new Dispatch();
        this.dispatchSets = [];
        this.activeIds = [];
    }

    ngOnInit() { }

    public search(): any {

        return (text: Observable<string>): Observable<any[]> => {

            return text.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap(term => {
                    if (term.length === 0) {
                        return [];
                    }

                    return this.fetchDeliveries(term);
                })
            );
        };
    }

    protected fetchDeliveries(term: string): Observable<any[]> {
        return this.ordersService.fetchDeliveries(term, true);
    }

    public getFormatter(): any {

        return (data: any): string => {
            return null;
        };
    }

    public onChooseDelivery(event: any): void {
        const modalRef = this.modalService.open(DeliveryPositionsModalComponent, {
            backdrop: true,
            windowClass: 'custom-bg-modal'
        });

        this.passPropertiesToDeliveryPositionsModal(event, modalRef);

        modalRef.result
            .then(result => {
                this.addDispatchSet(event.item, result);
            }, () => { });
    }

    protected passPropertiesToDeliveryPositionsModal(event: any, modalRef: NgbModalRef): void {
        modalRef.componentInstance.delivery = event.item;
    }

    private addDispatchSet(delivery: any, positions: OrderPosition[]): void {
        const set = new DispatchSet(delivery, positions);

        const setKey = this.dispatchSets.findIndex( setData => {
            return Number(setData.delivery.id) === Number(delivery.id);
        });

        if (setKey !== -1) {
            this.dispatchSets[setKey] = set;
            this.dispatch.replacePositions(positions);
        } else {
            this.dispatchSets.push(set);
            this.dispatch.addPositions(positions);
            this.activeIds.push(delivery.atb);
        }
    }

    public onCmrChange(): void {
        this.isCmr = !this.isCmr;

        if (!this.isCmr) {
            this.dispatch.clearCmr();
        }
    }

    public removeDispatchPosition($event: Event, position: OrderPosition, dispatchSetIndex: number, positionIndex: number): void {
        $event.preventDefault();

        this.dispatch.removePosition(position);

        if (this.dispatchSets[dispatchSetIndex].positions.length === 1) {
            this.dispatchSets.splice(dispatchSetIndex, 1);
            this.activeIds.splice(dispatchSetIndex, 1);
            return;
        }

        this.dispatchSets[dispatchSetIndex].positions.splice(positionIndex, 1);
    }

    public save(): void {
        this.showLoader();

        const data = this.dispatch.getJSONData();

        this.dispatchesService.create(data, this.isCmr)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Błąd podczas tworzenia wydania, sprawdź wprowadzone dane', true);
                    this.hideLoader();
                } else {
                    this.alert.success('Wydanie zostało utworzone pomyślnie');
                    this.hideLoader();
                    this.activeModal.close();
                }
            }, () => { this.hideLoader(); });
    }

    public isValidData(): boolean {
        return this.dispatch.isValidData();
    }

    public close(): void {
        this.modalHelper.openConfirmModal({
            title: 'Jesteś pewien?',
            text: 'Czy na pewno chcesz porzucić wprowadzone zmiany?',
            icon: 'fa fa-warning'
        })
            .then(() => {
                this.activeModal.dismiss();
            }, () => { });
    }


}
