import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './auth/token.interceptor';

import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {ClientModule} from './client/client.module';

import {UserService} from './services/user.service';
import {LoaderService} from './services/loader.service';
import {AlertService} from './services/alert.service';
import {AuthService} from './auth/auth.service';

import {AppComponent} from './app.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {LoaderComponent} from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import {APIInterceptor} from './api/api.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        LoaderComponent,
        AlertComponent,
    ],
    imports: [
        BrowserModule,
        ClientModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        LoaderService,
        AlertService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
