import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractModal } from '../abstract-modal';
import { DispatchesService } from '../../services/dispatches.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-dispatch-info-modal',
    templateUrl: './dispatch-info-modal.component.html',
    styleUrls: ['./dispatch-info-modal.component.scss']
})
export class DispatchInfoModalComponent extends AbstractModal implements OnInit {

    @Input() dispatch: any;

    public dispatchDetails: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dispatchesService: DispatchesService,
        private alert: AlertService
    ) {
        super(activeModal);
    }

    ngOnInit() {
        this.showLoader();
        this.fetchInfo();
    }

    private fetchInfo(): void {
        this.dispatchesService.fetchDispatchDetails(this.dispatch)
            .subscribe(data => {
                if (data instanceof Object) {
                    this.dispatchDetails = data;
                    this.hideLoader();
                } else {
                    this.alert.error('Coś poszło nie tak');
                    this.activeModal.close();
                }
            }, () => { this.activeModal.dismiss(); });
    }

}
