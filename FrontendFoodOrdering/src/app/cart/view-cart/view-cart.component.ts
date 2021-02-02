import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/shared/dialog.service';
import { CartItem } from '../cart-item.model';
import {
  ClearCart,
  DecreaseCartItemQuantity,
  IncreaseCartItemQuantity,
  RemoveCartItem,
} from '../store/cart.actions';
import { CartState } from '../store/cart.state';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css'],
})
export class ViewCartComponent implements OnInit {
  @Select(CartState.getCartItems) cartItems$: Observable<CartItem[]>;
  @Select(CartState.getTotalAmount) totalAmount$: Observable<number>;

  message = 'Cart is Empty!';
  constructor(private store: Store, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.cartItems$.subscribe((res) => {
      if (Array.isArray(res) && res.length) {
        this.message = null;
      }
    });
  }

  increaseQuantity(id: number) {
    this.store.dispatch(new IncreaseCartItemQuantity(id));
  }
  decreaseQuantity(id: number) {
    this.store.dispatch(new DecreaseCartItemQuantity(id));
  }

  clearCart() {
    this.dialogService
      .openConfirmDialog('Are you sure you want to clear the cart?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.store.dispatch(new ClearCart());
        }
      });
  }

  removeSingleItem(id: number) {
    this.store.dispatch(new RemoveCartItem(id));
  }
}
