import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserModalComponent } from '../../modals/add-user-modal/add-user-modal.component';
import { ModalHelperService } from '../../modals/modal-helper.service';
import { UsersService } from '../../api/users.service';
import { LoaderService } from '../../shared/services/loader.service';
import { UserType } from '../../models/enums/user.types';
import { UserInfoModalComponent } from '../../modals/user-info-modal/user-info-modal.component';
import { AlertService } from '../../services/alert.service';
import { EditUserModalComponent } from '../../modals/edit-user-modal/edit-user-modal.component';
import { FormControl } from '@angular/forms';
import { users } from '../../const/users';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    public page: number = 1;
    public needle: FormControl = new FormControl('');
    public usersConfig = users;

    constructor(
        private modalService: NgbModal,
        private modalHelper: ModalHelperService,
        public usersService: UsersService,
        private loader: LoaderService,
        private alert: AlertService
    ) {
    }

    ngOnInit() {
        this.loader.show();
        this.bindSearchEngine();
        this.handleUsers();
    }

    public pageChange(): void {
        this.loader.show();
        this.handleUsers(this.page, this.needle.value);
    }

    public openAddUserModal(): void {
        const modalRef = this.modalService.open(AddUserModalComponent, {
            keyboard: false
        });

        modalRef.result
            .then(() => {
               this.handleUsers(this.page);
            }, () => {});
    }

    public removeUser(user): void {
        this.modalHelper.openConfirmModal({
            title: 'Are you sure?',
            text: 'Do you want to remove this user permanently?',
            icon: 'fa fa-question'
        })
            .then(() => {
                this.loader.show();

                this.usersService.remove(user)
                    .subscribe(status => {
                        if (!status) {
                            this.alert.error('Something went wrong...');
                            this.loader.hide();
                        } else {
                            this.alert.success('User has been removed');
                            this.handleUsers(this.page, this.needle.value);
                        }
                    }, () => {
                        this.loader.hide();
                    });
            }, () => {});
    }

    public editUser(user): void {
        const modalRef = this.modalService.open(EditUserModalComponent, {
            keyboard: false
        });

        modalRef.componentInstance.user = user;
        modalRef.result
            .then(() => {
                this.handleUsers(this.page, this.needle.value);
            }, () => {});
    }

    public getRoleName(role: number): string {
        return Object.keys(UserType).find(key => UserType[key] === role);
    }

    public isClientRole(user): boolean {
        return user.role === UserType.Client;
    }

    public isHeadAdmin(user): boolean {
        return user.role === UserType.HeadAdmin;
    }

    public showInfoModal(user): void {
        const modalRef = this.modalService.open(UserInfoModalComponent);
        modalRef.componentInstance.user = user;
    }

    private handleUsers(page: number = 1, needle: string = ''): void {

        this.usersService.fetchUsers(page, needle)
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
        this.needle
            .valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe(
                value => {
                    this.filterUsers(value);
                }
            );
    }

    private filterUsers(needle: string): void {
        this.loader.show();
        this.page = 1;

        this.handleUsers(this.page, needle);
    }
}
