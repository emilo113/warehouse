import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import {AlertService} from '../services/alert.service';

@Injectable()
export class RoleGuardService implements CanActivate {

    constructor(
        public router: Router,
        private user: UserService,
        private alert: AlertService
    ) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {

        const expectedRoles: number[] = route.data.expectedRole;

        if (!expectedRoles.includes(this.user.getRole())) {
            this.router.navigate(['client']);
            this.alert.warn('You don\'t have permissions for access this route...', true);
            return false;
        }

        return true;
    }

}