import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from 'src/app/cart/store/cart.state';
import { SetThemeStatus } from 'src/app/shared/store/app.actions';
import { AppState } from 'src/app/shared/store/app.state';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Select(AppState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Select(AppState.isAdmin) isAdmin$: Observable<boolean>;
  @Select(AppState.isVendor) isVendor$: Observable<boolean>;
  @Select(CartState.getQty) getQty$: Observable<number>;

  toggleControl = new FormControl(false);

  constructor(
    private authService: AuthService,
    private store: Store,
    private overlayContainer: OverlayContainer
  ) {}

  ngOnInit() {
    this.toggleControl.valueChanges.subscribe((val) => {
      this.store.dispatch(new SetThemeStatus(val));
      const classes = this.overlayContainer.getContainerElement().classList;
      if (val) {
        classes.add('darkMode');
      } else {
        classes.remove('darkMode');
      }
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
