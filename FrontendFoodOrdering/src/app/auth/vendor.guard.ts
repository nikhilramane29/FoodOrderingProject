import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { take } from 'rxjs/operators';

@Injectable()
export class VendorGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isVendor: boolean;
    this.store
      .select((state) => state.app.isVendor)
      .pipe(take(1))
      .subscribe((result) => (isVendor = result));

    if (!isVendor) {
      this.router.navigate(['/auth']);
    }
    return isVendor;
  }
}
