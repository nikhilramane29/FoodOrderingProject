import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Select } from '@ngxs/store';
import { AppState } from 'src/app/shared/store/app.state';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.css'],
})
export class AuthCardComponent implements OnInit {
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  constructor() {}

  ngOnInit(): void {}
}
