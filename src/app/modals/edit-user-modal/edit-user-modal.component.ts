import {Component, Input, OnInit} from '@angular/core';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
    selector: 'app-edit-user-modal',
    templateUrl: '../add-user-modal/add-user-modal.component.html',
    styleUrls: ['../add-user-modal/add-user-modal.component.scss']
})
export class EditUserModalComponent extends AddUserModalComponent implements OnInit {
    @Input() user;

    public title: string = 'Edycja użytkownika';
    public buttonValue: string = 'Zapisz';

    ngOnInit() {
        this.userData.setDataFromUser(this.user);
    }

    public isValidData() {
        return this.userData.isValidDataWhileEditing();
    }

    protected saveUser(data) {

        this.usersService.edit(data)
            .subscribe(status => {
                if (!status) {
                    this.alert.error('Coś poszło nie tak');
                } else {
                    this.alert.success('Użytkownik został zapisany pomyślnie');
                }

                this.activeModal.close();
            }, () => { this.loader.hide(); });

    }
}
