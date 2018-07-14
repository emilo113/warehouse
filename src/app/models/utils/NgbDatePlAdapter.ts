import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';

@Injectable()
export class NgbDatePlAdapter extends NgbDateAdapter<Date> {

    fromModel(date: Date): NgbDateStruct {
        return (date) ?
            {
                year: Number(date.getFullYear()),
                month: Number(date.getMonth() + 1),
                day: Number(date.getDate())
            } : null;
    }

    toModel(date: NgbDateStruct): Date {
        if (!date) {
            return null;
        }

        const formattedDate = date.year.toString() + '-' +
            String('00' + date.month).slice(-2) + '-' +
            String('00' + date.day).slice(-2);

        return new Date(formattedDate);
    }
}