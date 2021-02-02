import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app.state';
import { User } from '../user-model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css'],
})
export class EditAccountComponent implements OnInit {
  userId: string | number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;

  @Select(AppState.User) userDetails$: Observable<User>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchUser();

    this.userDetails$.subscribe((userDetails) => {
      if (userDetails != null) {
        this.userId = userDetails.id;
        this.firstName = userDetails.firstName;
        this.lastName = userDetails.lastName;
        this.mobileNo = userDetails.mobileNo;
        this.email = userDetails.email;
      } else {
        this.userId = null;
        this.firstName = this.lastName = this.mobileNo = this.email = '';
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.updateUser(
      form.value.userId,
      form.value.firstName,
      form.value.lastName,
      form.value.mobileNo,
      form.value.email
    );
  }
}
