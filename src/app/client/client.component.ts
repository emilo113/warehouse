import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private router: Router,
        private alert: AlertService
    ) {}

    ngOnInit() {
        this.isAuthenticated();
    }

    private isAuthenticated() {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['']);
            this.alert.error('Please, sign in...');
        }
    }

    signOut() {
        this.auth.signOut();
        this.router.navigate(['']);
    }

}
