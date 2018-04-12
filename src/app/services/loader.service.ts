import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {

    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    private display(value: boolean) {
        this.status.next(value);
    }

    public show() {
        this.display(true);
    }

    public hide() {
        this.display(false);
    }

}
