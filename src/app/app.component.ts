import {Component, OnInit} from '@angular/core';
import {LoaderService} from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public showLoader: boolean;

    constructor(
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });

        setTimeout(() => {
            this.loaderService.hide();
        }, 2000);
    }
}
