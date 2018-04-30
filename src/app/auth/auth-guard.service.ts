import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {AlertService} from '../services/alert.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
        private alert: AlertService
    ) {
    }

    canActivate(): boolean {

        if (!this.auth.isAuthenticated()) {
            this.alert.error('Unauthorized! Please, sign in to get access...', true);
            this.router.navigate(['sign-in']);
            return false;
        }

        return true;
    }
}
