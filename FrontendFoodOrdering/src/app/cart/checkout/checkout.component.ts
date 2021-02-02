import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlaceOrder } from 'src/app/orders/store/order.action';
import { OpenSnackbar } from 'src/app/shared/store/app.actions';
import { AppState } from 'src/app/shared/store/app.state';
import { User } from 'src/app/user/user-model';
import { UserService } from 'src/app/user/user.service';
import { CartItem } from '../cart-item.model';
import { CartState } from '../store/cart.state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @Select(AppState.User) selUser$: Observable<User>;
  @Select(CartState.getCartItems) cartItems$: Observable<CartItem[]>;
  @Select(CartState.getTotalAmount) totalAmount$: Observable<number>;

  hidden: string;

  constructor(
    private userService: UserService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.fetchUser();
  }

  placeOrder() {
    this.store.dispatch(new PlaceOrder());
    this.store.dispatch(new OpenSnackbar('Order placed successfully!'));
    this.router.navigate(['/']);
  }
}
