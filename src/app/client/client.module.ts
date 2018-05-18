import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { AddUserModalComponent } from '../modals/add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from '../modals/edit-user-modal/edit-user-modal.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { UserInfoModalComponent } from '../modals/user-info-modal/user-info-modal.component';
import { EmptyPipe } from '../pipes/empty-string.pipe';
import { ObjectKeysPipe } from '../pipes/object-keys.pipe';
import { OrderInfoModalComponent } from '../modals/order-info-modal/order-info-modal.component';
import { SharedModule } from '../shared/shared.module';
import { DeliveryInfoModalComponent } from '../modals/delivery-info-modal/delivery-info-modal.component';
import { CreateOrderModalComponent } from '../modals/create-order-modal/create-order-modal.component';
import { EditOrderModalComponent } from '../modals/edit-order-modal/edit-order-modal.component';
import { DispatchesInfoModalComponent } from '../modals/dispatches-info-modal/dispatches-info-modal.component';
import { DispatchesComponent } from './dispatches/dispatches.component';
import { CreateDeliveryModalComponent } from '../modals/create-delivery-modal/create-delivery-modal.component';
import { DispatchInfoModalComponent } from '../modals/dispatch-info-modal/dispatch-info-modal.component';
import { EditDeliveryModalComponent } from '../modals/edit-delivery-modal/edit-delivery-modal.component';
import { CreateDispatchModalComponent } from '../modals/create-dispatch-modal/create-dispatch-modal.component';
import { DeliveryPositionsModalComponent } from '../modals/delivery-positions-modal/delivery-positions-modal.component';

@NgModule({
    imports: [
        ClientRoutingModule,
        BrowserModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        ClientComponent,
        OrdersComponent,
        UsersComponent,
        ConfirmModalComponent,
        AddUserModalComponent,
        EditUserModalComponent,
        UserInfoModalComponent,
        OrderInfoModalComponent,
        DeliveryInfoModalComponent,
        CreateOrderModalComponent,
        EditOrderModalComponent,
        DispatchesInfoModalComponent,
        DispatchInfoModalComponent,
        CreateDeliveryModalComponent,
        EditDeliveryModalComponent,
        CreateDispatchModalComponent,
        DeliveryPositionsModalComponent,
        EmptyPipe,
        ObjectKeysPipe,
        DispatchesComponent
    ],
    bootstrap: [
        ConfirmModalComponent,
        AddUserModalComponent,
        UserInfoModalComponent,
        EditUserModalComponent,
        OrderInfoModalComponent,
        DeliveryInfoModalComponent,
        CreateOrderModalComponent,
        EditOrderModalComponent,
        DispatchesInfoModalComponent,
        CreateDeliveryModalComponent,
        DispatchInfoModalComponent,
        EditDeliveryModalComponent,
        CreateDispatchModalComponent,
        DeliveryPositionsModalComponent
    ],
    exports: [
        EmptyPipe
    ]
})

export class ClientModule {
}
