import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Address } from 'src/app/shared/address.model';

import { Hotel } from '../hotel.model';
import { HotelService } from '../hotel.service';
import { HotelState } from '../store/hotel.state';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css'],
})
export class HotelEditComponent implements OnInit {
  country = 'India';
  hotelId: string;
  addressId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;

  @Select(HotelState.getSelectedHotel) selectedHotel$: Observable<Hotel>;
  @Select(HotelState.getSelectedHotelAddress)
  selectedHotelAddress$: Observable<Address>;

  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Puducherry',
  ];

  constructor(
    public route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelId = paramMap.get('hotelId');
      }
      this.hotelService.getOnlyHotelById(this.hotelId);
    });

    this.selectedHotelAddress$.subscribe((address) => {
      if (address != null) {
        this.addressId = address.id;
        this.addressLine1 = address.addressLine1;
        this.addressLine2 = address.addressLine2;
        this.city = address.city;
        this.state = address.state;
        this.pincode = address.pincode;
      } else {
        this.addressId = null;
        this.addressLine1 = this.addressLine2 = this.city = this.state = this.pincode =
          '';
      }
    });
  }

  onSubmit(id: number, form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.hotelService.updateHotel(
      id,
      form.value.hotelName,
      form.value.mobileNo,
      form.value.addressId,
      form.value.addressLine1,
      form.value.addressLine2,
      form.value.city,
      form.value.state,
      form.value.country,
      form.value.pincode,
      form.value.vendorEmail
    );
  }
}
