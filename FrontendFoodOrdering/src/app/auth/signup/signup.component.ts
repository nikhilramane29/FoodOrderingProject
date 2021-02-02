import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  vendorReg: boolean = false;
  vendorUrlString = '/vendorRegister';
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.router.url == this.vendorUrlString) {
      this.vendorReg = true;
    } else this.vendorReg = false;
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.vendorReg) {
      this.authService.createVendor(
        form.value.firstName,
        form.value.lastName,
        form.value.email,
        form.value.mobileNo,
        form.value.password
      );
    } else {
      this.authService.createUser(
        form.value.firstName,
        form.value.lastName,
        form.value.email,
        form.value.mobileNo,
        form.value.password
      );
    }
    this.vendorReg = false;
  }
}
