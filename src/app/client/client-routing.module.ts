import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders/orders.component';
import { ClientComponent } from './client.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { UsersComponent } from './users/users.component';
import { RoleGuardService } from '../auth/role-guard.service';

import { UserType } from '../models/enums/user.types';
import {User} from '../models/User';

const routes: Routes = [
    {
        path: 'client',
        component: ClientComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'orders',
                component: OrdersComponent,
                canActivate: [RoleGuardService],
                data: {
                    expectedRole: [UserType.HeadAdmin, UserType.Admin, UserType.Client]
                }
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [RoleGuardService],
                data: {
                    expectedRole: [UserType.HeadAdmin]
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
