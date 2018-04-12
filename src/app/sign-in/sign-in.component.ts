import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../services/user.service';
import {LoaderService} from '../services/loader.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

    public email: string;
    public password: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private userService: UserService,
        private loader: LoaderService,
        private alert: AlertService
    ) { }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.goClient();
        }
    }

    public signIn() {
        this.loader.show();
        this.authService.signIn(this.email, this.password)
            .subscribe(status => {
                    if (status) {
                        this.goClient();
                        this.loader.hide();
                    } else {
                        this.loader.hide();
                        this.alert.error('Login failed. Please, check your e-mail or password...');
                    }
                }
            );
    }

    public goClient() {
        this.router.navigate(['client']);
    }

}
