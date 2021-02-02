import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app.state';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  @Select(AppState.isAuthenticated) isAuth$: Observable<boolean>;
  @Select(AppState.isAdmin) isAdmin$: Observable<boolean>;
  @Select(AppState.isVendor) isVendor$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
