import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { AccountRoutingModule } from './account-routing.module';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditAddressComponent } from './edit-address/edit-address.component';

@NgModule({
  declarations: [EditAddressComponent, EditAccountComponent],
  imports: [
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    AccountRoutingModule,
  ],
})
export class AccountModule {}
