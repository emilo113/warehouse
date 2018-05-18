import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Order} from '../../models/Order';
import {ModalHelperService} from '../modal-helper.service';
import {AbstractModal} from '../abstract-modal';
import {UsersService} from '../../api/users.service';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import {OrdersService} from '../../services/orders.service';
import {OrderPosition} from '../../models/OrderPosition';

@Component({
    selector: 'app-create-order-modal',
    templateUrl: './create-order-modal.component.html',
    styleUrls: ['./create-order-modal.component.scss']
})
export class CreateOrderModalComponent extends AbstractModal implements OnInit {

    public orderData: Order = new Order();
    public otherOrderer: boolean = false;
    public isUserData: boolean = true;
    protected userData: any;
    public title: string = 'Creating order...';
    public buttonValue: string = 'Create';

    constructor(
        public activeModal: NgbActiveModal,
        protected modalHelper: ModalHelperService,
        protected usersService: UsersService,
        protected user: UserService,
        protected alert: AlertService,
        protected ordersService: OrdersService
    ) {
        super(activeModal);
    }

    ngOnInit() {
        this.showLoader();
        this.handleRole();
    }

    public save(): void {
        this.showLoader();

        const orderData = this.orderData.getJSONData();

        this.ordersService.create(orderData)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Error creating new order, check typed data...', true);
                    this.hideLoader();
                } else {
                    this.alert.success('Order has been created...');
                    this.hideLoader();
                    this.activeModal.close();
                }
            });
    }

    public isValidData(): boolean {
        return this.orderData.isValidData();
    }

    public ordererChange(): void {
        this.otherOrderer = !this.otherOrderer;

        if (!this.otherOrderer) {
            this.setUserData();
        }
    }

    public close(): void {
        this.modalHelper.openConfirmModal({
            title: 'Are you sure',
            text: 'Are you sure you want to dismiss your changes?',
            icon: 'fa fa-warning'
        })
            .then(() => {
                this.activeModal.dismiss();
            }, () => {
            });
    }

    public addOrderPosition(event: Event = null): void {
        event.preventDefault();
        this.orderData.addOrderPosition();
    }

    public removeOrderPosition(event: Event, index: number): void {
        event.preventDefault();
        this.orderData.removeOrderPosition(index);
    }

    protected handleRole() {
        if (this.user.isLevelAdmin()) {
            this.otherOrderer = true;
            this.isUserData = false;
            this.hideLoader();
        } else {
            this.fetchUserData();
        }
    }

    private fetchUserData() {
        this.usersService.fetchOwnData()
            .subscribe(data => {
                if (data.id) {
                    this.userData = data;
                    this.setUserData();
                    this.hideLoader();
                } else {
                    this.alert.error('Something went wrong...', true);
                    this.activeModal.dismiss();
                }

            });
    }

    private setUserData(): void {
        this.orderData.name = this.userData.name;
        this.orderData.address = this.userData.address;
        this.orderData.vaT_Id = this.userData.vaT_Id;
        this.orderData.email = this.userData.email;

        if (!this.orderData.isValidOrderer()) {
            this.otherOrderer = true;
            this.isUserData = false;
        }
    }

}
