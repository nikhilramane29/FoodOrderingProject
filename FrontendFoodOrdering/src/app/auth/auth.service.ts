import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginData } from './auth-login-data.model';
import { AuthRegistrationData } from './auth-registration-data.model';
import { Store } from '@ngxs/store';
import {
  OpenSnackbar,
  SetAdminFalse,
  SetAdminTrue,
  SetAuthenticated,
  SetUnauthenticated,
  SetVendorFalse,
  SetVendorTrue,
  StartLoading,
  StopLoading,
} from '../shared/store/app.actions';
import { ClearCart, LoadCartItems } from '../cart/store/cart.actions';
import { environment } from 'src/environments/environment';

export const ROLE_ADMIN = 'admin';
export const ROLE_VENDOR = 'vendor';
export const ROLE_USER = 'user';
const BANKEND_URL = environment.baseUrl + '/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private tokenTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  getToken() {
    return this.token;
  }

  createUser(
    firstName: string,
    lastName: string,
    email: string,
    mobileNo: string,
    password: string
  ) {
    const authData: AuthRegistrationData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNo: mobileNo,
      password: password,
    };
    this.store.dispatch(new StartLoading());
    this.http.post(BANKEND_URL + '/register', authData).subscribe(
      () => {
        this.store.dispatch(new StopLoading());
        this.login(authData.email, authData.password);
        this.store.dispatch(
          new OpenSnackbar('Registered & Logged in successfully!')
        );
        this.router.navigate(['/']);
      },
      () => {
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new SetUnauthenticated());
      }
    );
  }

  createVendor(
    firstName: string,
    lastName: string,
    email: string,
    mobileNo: string,
    password: string
  ) {
    const authData: AuthRegistrationData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNo: mobileNo,
      password: password,
    };
    this.store.dispatch(new StartLoading());
    this.http.post(BANKEND_URL + '/register/vendor', authData).subscribe(
      () => {
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new OpenSnackbar('Vendor created successfully!'));
        this.router.navigate(['/']);
      },
      () => {
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new SetUnauthenticated());
      }
    );
  }

  login(email: string, password: string) {
    const authData: AuthLoginData = {
      email: email,
      password: password,
    };
    this.store.dispatch(new StartLoading());
    this.http
      .post<{ token: string; expiresIn: number; role: string }>(
        BANKEND_URL + '/login',
        authData
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (this.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);

            const roleCheck = response.role;

            this.roleHandling(roleCheck);

            this.store.dispatch(new StopLoading());
            this.store.dispatch(new SetAuthenticated());
            this.store.dispatch(new OpenSnackbar('Logged in successfully!'));
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, roleCheck);
            this.router.navigate(['/']);
          }
        },
        () => {
          this.store.dispatch(new StopLoading());
          console.log('Invalid Credentials');
          this.store.dispatch(new SetUnauthenticated());
        }
      );
  }

  autoAuthUser() {
    this.store.dispatch(new StartLoading());
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      let roleCheck = authInfo.role;
      this.roleHandling(roleCheck);
      this.store.dispatch(new SetAuthenticated());
      this.setAuthTimer(expiresIn / 1000);
    }

    this.store.dispatch(new StopLoading());
  }

  logout() {
    this.token = null;
    this.store.dispatch(new SetUnauthenticated());
    this.store.dispatch(new OpenSnackbar('Logged out successfully!'));
    this.router.navigate(['/']);
    this.clearAuthData();
    this.store.dispatch(new SetAdminFalse());
    this.store.dispatch(new SetVendorFalse());
    clearTimeout(this.tokenTimer);
    if (this.getRole() == 'user') {
      console.log('in logout of user');
      this.store.dispatch(new ClearCart());
    }
  }

  getRole() {
    const role = localStorage.getItem('role');
    return role;
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expDate', expirationDate.toISOString());
    localStorage.setItem('role', role);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
    localStorage.removeItem('role');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expDate');
    const role = localStorage.getItem('role');
    if (!token || !expirationDate || !role) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      role: role,
    };
  }

  private roleHandling(roleCheck) {
    if (roleCheck == ROLE_ADMIN) {
      this.store.dispatch(new SetAdminTrue());
    } else if (roleCheck == ROLE_VENDOR) {
      this.store.dispatch(new SetVendorTrue());
    } else if (roleCheck == ROLE_USER) {
      this.store.dispatch(new LoadCartItems());
    }
  }
}
