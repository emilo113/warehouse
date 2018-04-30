import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

    constructor(
        private auth: AuthService,
        private router: Router,
        public user: UserService
    ) {}

    ngOnInit() {

    }

    signOut() {
        this.auth.signOut();
        this.router.navigate(['sign-in']);
    }

}
