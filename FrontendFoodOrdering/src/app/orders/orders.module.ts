import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

@NgModule({
  declarations: [ViewOrdersComponent, EditOrdersComponent],
  imports: [
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    OrdersRoutingModule,
  ],
})
export class OrdersModule {}
