import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ClientModule } from './client/client.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';

import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './api/users.service';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AlertComponent } from './alert/alert.component';
import { APIInterceptor } from './api/api.interceptor';
import { AuthGuardService } from './auth/auth-guard.service';
import { RoleGuardService } from './auth/role-guard.service';
import { ModalHelperService } from './modals/modal-helper.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { UnauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { OrdersService } from './services/orders.service';
import { DispatchesService } from './services/dispatches.service';

@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        ClientModule,
        SharedModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule.forRoot()
    ],
    providers: [
        UserService,
        AlertService,
        AuthService,
        AuthGuardService,
        RoleGuardService,
        ModalHelperService,
        UsersService,
        OrdersService,
        DispatchesService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UnauthorizedInterceptor,
            multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {

}
