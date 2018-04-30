import {OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export class AbstractModal implements OnInit {

    public loading: boolean = false;

    constructor(
        public activeModal: NgbActiveModal
    ) {}

    ngOnInit() {

    }

    public showLoader() {
        this.loading = true;
    }

    public hideLoader() {
        this.loading = false;
    }

}