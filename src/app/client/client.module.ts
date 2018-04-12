import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';

@NgModule({
    imports: [
        ClientRoutingModule
    ],
    declarations: [
        ClientComponent,
        OrdersComponent,
        AboutComponent
    ]
})

export class ClientModule {
}
