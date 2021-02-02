import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Address } from 'src/app/shared/address.model';
import { AppState } from 'src/app/shared/store/app.state';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
})
export class EditAddressComponent implements OnInit {
  country = 'India';
  addressId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;

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

  @Select(AppState.userAddress) userAddress$: Observable<Address>;

  constructor(private userService: UserService, private location: Location) {}

  ngOnInit(): void {
    this.userService.fetchUser();

    this.userAddress$.subscribe((address) => {
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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.updateUserAddress(
      form.value.addressId,
      form.value.addressLine1,
      form.value.addressLine2,
      form.value.city,
      form.value.state,
      form.value.country,
      form.value.pincode
    );
  }

  addAddress(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.addUserAddress(
      form.value.addressLine1,
      form.value.addressLine2,
      form.value.city,
      form.value.state,
      form.value.country,
      form.value.pincode
    );
  }

  cancel() {
    this.location.back();
  }
}
