import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService, ROLE_ADMIN, ROLE_VENDOR } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MasterGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isAdminOrVendor: boolean;
    let role = this.authService.getRole();

    if (role == ROLE_ADMIN) {
      this.store
        .select((state) => state.app.isAdmin)
        .pipe(take(1))
        .subscribe((result) => (isAdminOrVendor = result));
    } else if (role == ROLE_VENDOR) {
      this.store
        .select((state) => state.app.isVendor)
        .pipe(take(1))
        .subscribe((result) => (isAdminOrVendor = result));
    }

    if (isAdminOrVendor == false) {
      this.router.navigate(['/auth']);
    }
    return isAdminOrVendor;
  }
}
