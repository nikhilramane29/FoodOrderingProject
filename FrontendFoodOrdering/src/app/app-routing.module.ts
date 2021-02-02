import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelCreateComponent } from './hotels/hotel-create/hotel-create.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelMenuListComponent } from './hotels/hotel-menu-list/hotel-menu-list.component';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';
import { AddMenuItemComponent } from './hotels/add-menu-item/add-menu-item.component';
import { EditMenuItemComponent } from './hotels/edit-menu-item/edit-menu-item.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VendorDashboardComponent } from './vendor/vendor-dashboard/vendor-dashboard.component';
import { VendorGuard } from './auth/vendor.guard';
import { MasterGuard } from './auth/master.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HotelListComponent },
  {
    path: 'hotelCreate',
    component: HotelCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hotel/:hotelId',
    component: HotelMenuListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hotel/:hotelId/edit',
    component: HotelEditComponent,
    canActivate: [MasterGuard],
  },
  {
    path: 'hotel/:hotelId/add',
    component: AddMenuItemComponent,
    canActivate: [MasterGuard],
  },
  {
    path: 'hotel/:hotelId/:menuId/edit',
    component: EditMenuItemComponent,
    canActivate: [MasterGuard],
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./user/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'vendorRegister',
    component: SignupComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'vendor-dashboard',
    component: VendorDashboardComponent,
    canActivate: [VendorGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, AdminGuard, VendorGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
