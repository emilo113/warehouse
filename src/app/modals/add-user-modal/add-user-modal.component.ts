import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalHelperService} from '../modal-helper.service';
import {User} from '../../models/User';
import {UserType} from '../../models/enums/user.types';
import {LoaderService} from '../../shared/services/loader.service';
import {UsersService} from '../../api/users.service';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-add-user-modal',
    templateUrl: './add-user-modal.component.html',
    styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {

    public userData: User = new User();
    public userTypes = UserType;
    public title: string = 'Tworzenie użytkownika';
    public buttonValue: string = 'Utwórz';

    constructor(
        public activeModal: NgbActiveModal,
        private modalHelper: ModalHelperService,
        protected loader: LoaderService,
        protected usersService: UsersService,
        protected alert: AlertService
    ) { }

    ngOnInit() { }

    public close() {
        this.modalHelper.openConfirmModal({
            title: 'Jesteś pewien?',
            text: 'Czy na pewno chcesz porzucić wprowadzone zmiany?',
            icon: 'fa fa-warning'
        })
            .then(() => {
                this.activeModal.dismiss();
            }, () => {});
    }

    public onRoleChanged() {
        this.userData.onRoleChanged();
    }

    public isValidData(): boolean {
        return this.userData.isValidData();
    }

    public save() {
        this.loader.show();

        let data;

        if (this.userData.isClient()) {
            data = this.userData.getClientData();
        } else {
            data = this.userData.getUserData();
        }

        this.saveUser(data);
    }

    protected saveUser(data) {

        this.usersService.register(data)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Coś poszło nie tak');
                } else {
                    this.alert.success('Użytkownik został utworzony pomyślnie');
                }

                this.activeModal.close();
            }, () => {
                this.loader.hide();
            });

    }

}
