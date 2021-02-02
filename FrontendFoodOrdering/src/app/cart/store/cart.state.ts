import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  State,
  Action,
  Selector,
  StateContext,
  Store,
  Select,
} from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Hotel } from 'src/app/hotels/hotel.model';
import { HotelState } from 'src/app/hotels/store/hotel.state';
import { DialogService } from 'src/app/shared/dialog.service';
import { CartItem } from '../cart-item.model';
import { CartService } from '../cart.service';
import {
  AddItemToCart,
  CalculateTotalAmount,
  ClearCart,
  DecreaseCartItemQuantity,
  IncreaseCartItemQuantity,
  LoadCartItems,
  RefreshCart,
  RemoveCartItem,
  SetCurrentCartHotel,
} from './cart.actions';

export interface CartStateModel {
  cartItems: CartItem[];
  totalAmount: number;
  currentCartHotel: Hotel;
}

export const getCartInitialState = (): CartStateModel => ({
  cartItems: [],
  totalAmount: null,
  currentCartHotel: null,
});

@State<CartStateModel>({
  name: 'cart',
  defaults: getCartInitialState(),
})
@Injectable()
export class CartState {
  constructor(
    private store: Store,
    private cartService: CartService,
    private router: Router
  ) {}

  @Select(HotelState.getSelectedHotel) selectedHotel$: Observable<Hotel>;

  @Selector()
  public static getState(state: CartStateModel) {
    return state;
  }

  @Selector()
  public static getCartItems(state: CartStateModel) {
    return state.cartItems;
  }

  @Selector()
  public static getQty(state: CartStateModel) {
    return state.cartItems.length;
  }

  @Selector()
  public static getTotalAmount(state: CartStateModel) {
    return state.totalAmount;
  }

  @Selector()
  public static getCurrentHotel(state: CartStateModel) {
    return state.currentCartHotel;
  }

  @Action(LoadCartItems)
  public loadCartFromDb(
    { patchState }: StateContext<CartStateModel>,
    action: LoadCartItems
  ) {
    return this.cartService.fetchCart().subscribe((result) => {
      patchState({
        cartItems: [...result],
      });
      this.store.dispatch(new CalculateTotalAmount());
    });
  }

  @Action(AddItemToCart)
  public selectedHotelLoaded(
    { patchState, getState }: StateContext<CartStateModel>,
    action: AddItemToCart
  ) {
    const state = getState();
    let dupItem = state.cartItems.find(
      (c) => c.item.id == action.payload.item.id
    );
    if (dupItem == null) {
      return this.cartService
        .addCartItem(action.payload)
        .subscribe((result) => {
          patchState({
            cartItems: [...result],
          });
          this.store.dispatch(new CalculateTotalAmount());
        });
    }
  }

  @Action(ClearCart)
  public clearCart({ setState }: StateContext<CartStateModel>) {
    return this.cartService.clearCart().pipe(
      tap((result) => {
        setState(getCartInitialState());
        this.router.navigate(['/']);
      })
    );
  }

  @Action(IncreaseCartItemQuantity)
  public increaseQuantity(
    ctx: StateContext<CartStateModel>,
    action: IncreaseCartItemQuantity
  ) {
    const state = ctx.getState();
    const item = state.cartItems.find((item) => item.item.id == action.payload);
    let inCartQty = state.cartItems.find((x) => x.item.id === action.payload)
      .quantity;

    if (inCartQty > 0) {
      inCartQty++;
    }

    const current: CartItem = {
      id: item.id,
      item: item.item,
      quantity: inCartQty,
    };

    return this.cartService.updateCartItemQty(current).subscribe((resp) => {
      ctx.patchState({
        cartItems: [
          ...state.cartItems.filter((x) => x.item.id !== action.payload),
          current,
        ],
      });
      this.store.dispatch(new CalculateTotalAmount());
    });
  }

  @Action(DecreaseCartItemQuantity)
  public decreaseQuantity(
    ctx: StateContext<CartStateModel>,
    action: DecreaseCartItemQuantity
  ) {
    const state = ctx.getState();
    const item = state.cartItems.find((item) => item.item.id == action.payload);
    let inCartQty = state.cartItems.find((x) => x.item.id === action.payload)
      .quantity;

    if (inCartQty > 1) {
      inCartQty--;
    } else if (inCartQty <= 1) {
      this.store.dispatch(new RemoveCartItem(item.id));
      return;
    }

    const current: CartItem = {
      id: item.id,
      item: item.item,
      quantity: inCartQty,
    };

    return this.cartService.updateCartItemQty(current).subscribe((resp) => {
      ctx.patchState({
        cartItems: [
          ...state.cartItems.filter((x) => x.item.id !== action.payload),
          current,
        ],
      });
      this.store.dispatch(new CalculateTotalAmount());
    });
  }

  @Action(RemoveCartItem)
  public removeSingleCartItem(
    { patchState }: StateContext<CartStateModel>,
    action: RemoveCartItem
  ) {
    return this.cartService.removeCartItem(action.payload).pipe(
      tap((result) => {
        patchState({
          cartItems: [...result],
        });
        this.store.dispatch(new CalculateTotalAmount());
      })
    );
  }

  @Action(CalculateTotalAmount)
  public calcTotalAmount({
    patchState,
    getState,
  }: StateContext<CartStateModel>) {
    const state = getState();
    let amount = 0;
    if (state.cartItems.length >= 1) {
      state.cartItems.map((m) => (amount += m.item.itemPrice * m.quantity));
      patchState({
        totalAmount: amount,
      });
    } else {
      this.store.dispatch(new ClearCart());
    }
  }

  @Action(SetCurrentCartHotel)
  public setCurrentHotel(
    { patchState }: StateContext<CartStateModel>,
    action: SetCurrentCartHotel
  ) {
    patchState({ currentCartHotel: action.payload });
  }

  @Action(RefreshCart)
  public refreshCart({ setState }: StateContext<CartStateModel>) {
    setState(getCartInitialState());
    this.store.dispatch(new LoadCartItems());
  }
}
