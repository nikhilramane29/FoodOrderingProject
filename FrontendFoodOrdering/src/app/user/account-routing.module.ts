import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditAddressComponent } from './edit-address/edit-address.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'edit-account',
        component: EditAccountComponent,
      },
      {
        path: 'edit-address',
        component: EditAddressComponent,
      },
    ],
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AccountRoutingModule {}
