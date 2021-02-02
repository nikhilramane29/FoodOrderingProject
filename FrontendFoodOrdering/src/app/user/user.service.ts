import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import {
  GetUserDetails,
  StartLoading,
  StopLoading,
} from '../shared/store/app.actions';
import { User } from './user-model';

const BACKEND_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}

  fetchUser() {
    this.store.dispatch(new StartLoading());

    this.http.get<User>(BACKEND_URL + '/api/account').subscribe(
      (user) => {
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new GetUserDetails(user));
      },
      (error) => {
        this.store.dispatch(new StopLoading());
        console.log(error);
      }
    );
  }

  updateUserAddress(
    addressId: number,
    addressLine1: string,
    addressLine2: string | undefined,
    city: string,
    state: string,
    country: string,
    pincode: string
  ) {
    const userUpdateAddData = {
      id: addressId,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };

    this.store.dispatch(new StartLoading());

    this.http
      .put(BACKEND_URL + '/api/account/address', userUpdateAddData)
      .subscribe((res) => {
        this.store.dispatch(new StopLoading());
        this.router.navigate(['/']);
      });
  }

  updateUser(id, firstName, lastName, mobileNo, email) {
    const userUpdateData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      mobileNo: mobileNo,
      email: email,
    };

    this.store.dispatch(new StartLoading());

    this.http
      .put(BACKEND_URL + '/api/account', userUpdateData)
      .subscribe((res) => {
        this.store.dispatch(new StopLoading());
        this.router.navigate(['/']);
      });
  }

  addUserAddress(
    addressLine1: string,
    addressLine2: string | undefined,
    city: string,
    state: string,
    country: string,
    pincode: string
  ) {
    const userAddressAdd = {
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
    };

    this.store.dispatch(new StartLoading());

    this.http
      .post(BACKEND_URL + '/api/account/address', userAddressAdd)
      .subscribe((res) => {
        this.store.dispatch(new StopLoading());
        this.router.navigate(['/']);
      });
  }
}
