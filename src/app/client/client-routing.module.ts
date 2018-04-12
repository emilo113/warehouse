import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { ClientComponent } from './client.component';

const routes: Routes = [
    {
        path: 'client',
        component: ClientComponent,
        children: [
            {
                path: 'orders',
                component: OrdersComponent
            },
            {
                path: 'about',
                component: AboutComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
