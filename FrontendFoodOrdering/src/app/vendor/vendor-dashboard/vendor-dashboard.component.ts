import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hotel } from 'src/app/hotels/hotel.model';
import { HotelState } from 'src/app/hotels/store/hotel.state';
import { AppState } from '../../shared/store/app.state';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css'],
})
export class VendorDashboardComponent implements OnInit {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(AppState.isVendor) isVendor$: Observable<boolean>;
  @Select(HotelState.getSelectedHotel) selectedHotel$: Observable<Hotel>;

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.vendorService.getVendorHotel();
  }

  openHotel(id) {
    this.vendorService.openHotelMenu(id);
  }

  openOrders(id) {
    this.vendorService.openHotelOrders(id);
  }
}
