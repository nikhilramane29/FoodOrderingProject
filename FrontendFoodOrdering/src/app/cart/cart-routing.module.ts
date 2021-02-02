import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewCartComponent } from './view-cart/view-cart.component';

const routes: Routes = [
  { path: '', component: ViewCartComponent, canActivate: [AuthGuard] },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CartRoutingModule {}
