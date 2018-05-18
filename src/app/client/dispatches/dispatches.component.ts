import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { FormControl } from '@angular/forms';
import { DispatchesService } from '../../services/dispatches.service';
import { dispatches } from '../../const/dispatches';
import { ModalHelperService } from '../../modals/modal-helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DispatchInfoModalComponent} from '../../modals/dispatch-info-modal/dispatch-info-modal.component';
import {CreateDispatchModalComponent} from '../../modals/create-dispatch-modal/create-dispatch-modal.component';

@Component({
    selector: 'app-dispatches',
    templateUrl: './dispatches.component.html',
    styleUrls: ['./dispatches.component.scss']
})
export class DispatchesComponent implements OnInit {

    public page: number = 1;
    public needle: FormControl = new FormControl();
    public dispatchesConfig: any = dispatches;

    constructor(
        public dispatchesService: DispatchesService,
        public userService: UserService,
        private loader: LoaderService,
        private alert: AlertService,
        private modalHelper: ModalHelperService,
        private modalService: NgbModal
    ) {
    }

    ngOnInit() {
        this.loader.show();
        this.bindSearchEngine();
        this.handleDispatches();
    }

    public pageChange(): void {
        this.loader.show();
        this.handleDispatches(this.page);
    }

    public removeDispatch(dispatch: any): void {
        this.modalHelper.openConfirmModal({
            title: 'Are you sure?',
            text: 'Do you want to remove this dispatch permanently?',
            icon: 'fa fa-question'
        })
            .then(() => {
                this.loader.show();

                this.dispatchesService.remove(dispatch)
                    .subscribe(status => {
                        if (!status) {
                            this.alert.error('Something went wrong...');
                            this.loader.hide();
                        } else {
                            this.alert.success('Order has been removed');
                            this.handleDispatches(this.page, this.needle.value);
                        }
                    }, () => {
                        this.loader.hide();
                    });
            }, () => {});
    }

    public showDispatchInfo(dispatch: any): void {
        const modalRef = this.modalService.open(DispatchInfoModalComponent);
        modalRef.componentInstance.dispatch = dispatch;
    }

    public openCreateDispatchModal(): void {
        const modalRef = this.modalService.open(CreateDispatchModalComponent, {
            size: 'lg',
            keyboard: false
        });
    }


    private handleDispatches(page: number = 1, needle: string = ''): void {
        this.dispatchesService.fetchDispatches(page, needle)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Something went wrong...');
                }

                this.loader.hide();
            }, () => {
                this.loader.hide();
            });
    }

    private bindSearchEngine(): void {
        this.needle.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(
                value => {
                    this.filterDispatches(value);
                }
            );
    }

    private filterDispatches(needle: string): void {
        this.loader.show();
        this.page = 1;

        this.handleDispatches(this.page, needle);
    }

}