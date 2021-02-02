import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CartRoutingModule } from './cart-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewCartComponent } from './view-cart/view-cart.component';

@NgModule({
  declarations: [CheckoutComponent, ViewCartComponent],
  imports: [
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    CartRoutingModule,
  ],
})
export class CartModule {}
