import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { MenuItem } from '../menu-item.model';
import { Select, Store } from '@ngxs/store';
import { AppState } from 'src/app/shared/store/app.state';
import { HotelState } from '../store/hotel.state';
import {
  AddItemToCart,
  ClearCart,
  SetCurrentCartHotel,
} from 'src/app/cart/store/cart.actions';
import { Address } from 'src/app/shared/address.model';
import { DialogService } from 'src/app/shared/dialog.service';
import { CartState } from 'src/app/cart/store/cart.state';
import { VendorService } from 'src/app/vendor/vendor.service';

@Component({
  selector: 'app-hotel-menu-list',
  templateUrl: './hotel-menu-list.component.html',
  styleUrls: ['./hotel-menu-list.component.css'],
})
export class HotelMenuListComponent implements OnInit {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(HotelState.getSelectedHotel) selectedHotel$: Observable<Hotel>;
  @Select(HotelState.getSelectedHotelMenu) selectedHotelMenu$: Observable<
    MenuItem[]
  >;
  @Select(HotelState.getSelectedHotelAddress)
  selectedHotelAddress$: Observable<Address>;
  @Select(CartState.getCurrentHotel) currentHotel$: Observable<Hotel>;

  @Select(AppState.isAdmin) isAdmin$: Observable<boolean>;
  @Select(AppState.isVendor) isVendor$: Observable<boolean>;

  hotelIdString: string;
  addressString: string;

  selectedFile: File = null;
  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private hotelService: HotelService,
    private store: Store,
    private dialogService: DialogService,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelIdString = paramMap.get('hotelId');

        this.hotelService.getSelectedHotelAndMenuById(this.hotelIdString);

        this.selectedHotelAddress$.subscribe((address) => {
          if (address) {
            this.addressString =
              address.addressLine1 +
              (address.addressLine2 ? ', ' + address.addressLine2 : '') +
              ', ' +
              address.city +
              ' - ' +
              address.pincode;
          } else {
            this.addressString = null;
          }
        });
      } else {
        console.log('else in hotel menu list ngOnInit');
      }
    });
  }

  addToCart(menuItem: MenuItem) {
    let currentHotel: Hotel;
    let currentSelectHotel: Hotel;
    this.currentHotel$.subscribe((h) => (currentHotel = h));
    this.selectedHotel$.subscribe((h) => (currentSelectHotel = h));

    if (currentHotel == null) {
      this.store.dispatch(new SetCurrentCartHotel(currentSelectHotel));
      this.store.dispatch(new AddItemToCart({ item: menuItem, quantity: 1 }));
    } else if (currentHotel.id != currentSelectHotel.id) {
      this.dialogService
        .openConfirmDialog(
          'The item you are adding now is from different Hotel. Do you want to clear your cart and add again?'
        )
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            this.store.dispatch(new ClearCart());
          }
        });
    } else {
      this.store.dispatch(new AddItemToCart({ item: menuItem, quantity: 1 }));
    }
  }

  editHotel() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
    });
  }

  deleteHotel() {
    this.dialogService
      .openConfirmDialog(
        "Are you sure to delete this Hotel and it's related address & vendor account ?"
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.hotelService.deleteHotel(this.hotelIdString);
        }
      });
  }

  deleteItem(menuId) {
    this.dialogService
      .openConfirmDialog('Are you sure to delete this Menu Item ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.hotelService.deleteMenuItem(this.hotelIdString, menuId);
        }
      });
  }

  editItem(menuId) {
    this.router.navigate([menuId, 'edit'], { relativeTo: this.route });
  }

  openOrders(id) {
    this.vendorService.openHotelOrders(id);
  }

  //Image Handling
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload(hotelId: number) {
    this.hotelService
      .uploadHotelImage(this.selectedFile, hotelId)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
