import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { HotelCreateComponent } from './hotels/hotel-create/hotel-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelMenuListComponent } from './hotels/hotel-menu-list/hotel-menu-list.component';
import { ErrorInterceptor } from './shared/error-interceptor';
import { ErrorComponent } from './shared/error-page/error.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { environment } from '../environments/environment';
import { AppState } from './shared/store/app.state';

import { CommonModule } from '@angular/common';
import { HotelState } from './hotels/store/hotel.state';
import { CartState } from './cart/store/cart.state';
import { HotelEditComponent } from './hotels/hotel-edit/hotel-edit.component';
import { AddMenuItemComponent } from './hotels/add-menu-item/add-menu-item.component';
import { EditMenuItemComponent } from './hotels/edit-menu-item/edit-menu-item.component';
import { VendorDashboardComponent } from './vendor/vendor-dashboard/vendor-dashboard.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { OrderState } from './orders/store/order.state';
import { NotFoundComponent } from './shared/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    ErrorComponent,
    HotelCreateComponent,
    HotelListComponent,
    HotelMenuListComponent,
    HotelEditComponent,
    AddMenuItemComponent,
    EditMenuItemComponent,
    VendorDashboardComponent,
    ConfirmDialogComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule,
    NgxsModule.forRoot([AppState, HotelState, CartState, OrderState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, ConfirmDialogComponent],
})
export class AppModule {}
