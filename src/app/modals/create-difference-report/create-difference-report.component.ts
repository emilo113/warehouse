import {Component, Input, OnInit} from '@angular/core';
import {AbstractModal} from '../abstract-modal';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DifferenceReport} from '../../models/DifferenceReport';
import {OrdersService} from '../../services/orders.service';
import {PdfCreatorService} from '../../shared/services/pdf-creator.service';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-create-difference-report',
    templateUrl: './create-difference-report.component.html',
    styleUrls: ['./create-difference-report.component.scss']
})
export class CreateDifferenceReportComponent extends AbstractModal implements OnInit {
    @Input() order;

    public report: DifferenceReport;
    public sendEmail: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ordersService: OrdersService,
        private pdfCreator: PdfCreatorService,
        private alert: AlertService
    ) {
        super(activeModal);
        this.report = new DifferenceReport();
        this.sendEmail = false;
    }

    public generate(): void {
        this.showLoader();
        this.ordersService.getDifferenceReport(this.order, this.report.getJSONData(), this.sendEmail)
            .subscribe(data => {
                if (!data) {
                    this.alert.error('Coś poszło nie tak');
                    this.hideLoader();
                } else {
                    this.pdfCreator.downloadPdf(
                        data,
                        this.pdfCreator.generateNameForDifferenceReport(this.order)
                    );
                    this.activeModal.close();
                }
            }, () => { this.hideLoader(); });
    }

    public isValidData(): boolean {
        return this.report.isValidData();
    }

    public sendEmailChange(): void {
        this.sendEmail = !this.sendEmail;
    }

}
