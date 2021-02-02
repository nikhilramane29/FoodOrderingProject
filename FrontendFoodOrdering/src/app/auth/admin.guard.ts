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
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let isAdmin: boolean;
    this.store
      .select((state) => state.app.isAdmin)
      .pipe(take(1))
      .subscribe((result) => (isAdmin = result));

    if (!isAdmin) {
      this.router.navigate(['/auth']);
    }
    return isAdmin;
  }
}
