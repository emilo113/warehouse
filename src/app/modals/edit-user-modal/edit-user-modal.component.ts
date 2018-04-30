import {Component, Input, OnInit} from '@angular/core';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
    selector: 'app-edit-user-modal',
    templateUrl: '../add-user-modal/add-user-modal.component.html',
    styleUrls: ['../add-user-modal/add-user-modal.component.scss']
})
export class EditUserModalComponent extends AddUserModalComponent implements OnInit {
    @Input() user;

    public title: string = 'Editing user...';
    public buttonValue: string = 'Save';

    ngOnInit() {
        this.userData.setDataFromUser(this.user);
    }

    public isValidData() {
        return this.userData.isValidDataWhileEditing();
    }

    protected saveUser(data) {

        data.Id = this.user.id;

        this.usersService.edit(data)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Something went wrong...');
                } else {
                    this.alert.success('User edited successfully!');
                }

                this.activeModal.close();
            }, () => {
                this.alert.error('Something went wrong...');
                this.loader.hide();
            });

    }
}
