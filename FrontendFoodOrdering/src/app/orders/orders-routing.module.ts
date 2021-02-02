import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MasterGuard } from '../auth/master.guard';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

const routes: Routes = [
  { path: '', component: ViewOrdersComponent, canActivate: [AuthGuard] },
  {
    path: ':hotelId',
    component: EditOrdersComponent,
    canActivate: [MasterGuard],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class OrdersRoutingModule {}
