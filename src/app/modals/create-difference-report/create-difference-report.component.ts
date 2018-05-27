import {Component, Input, OnInit} from '@angular/core';
import {AbstractModal} from '../abstract-modal';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DifferenceReport} from '../../models/DifferenceReport';

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
        public activeModal: NgbActiveModal
    ) {
        super(activeModal);
        this.report = new DifferenceReport();
        this.sendEmail = false;
    }

    public generate(): void {
        console.log(this.report.getJSONData());
    }

    public isValidData(): boolean {
        return this.report.isValidData();
    }

    public sendEmailChange(): void {
        this.sendEmail = !this.sendEmail;
    }

}
