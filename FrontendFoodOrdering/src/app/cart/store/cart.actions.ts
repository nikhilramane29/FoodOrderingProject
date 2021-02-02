import { Hotel } from 'src/app/hotels/hotel.model';
import { CartItem } from '../cart-item.model';

export class LoadCartItems {
  public static readonly type = '[CART] Load Cart Items';
  constructor() {}
}

export class AddItemToCart {
  public static readonly type = '[CART] Add Items to Cart';
  constructor(public payload: CartItem) {}
}

export class IncreaseCartItemQuantity {
  public static readonly type = '[CART] Increase Cart Item Quantity';
  constructor(public payload: number) {}
}

export class DecreaseCartItemQuantity {
  public static readonly type = '[CART] Decrease Cart Item Quantity';
  constructor(public payload: number) {}
}

export class ClearCart {
  public static readonly type = '[CART] Clear Cart';
  constructor() {}
}

export class RemoveCartItem {
  public static readonly type = '[CART] Remove Cart Item';
  constructor(public payload: number) {}
}

export class CalculateTotalAmount {
  public static readonly type = '[CART] Calculate Total Amount';
  constructor() {}
}

export class SetCurrentCartHotel {
  public static readonly type = '[CART] Set Current Cart Hotel';
  constructor(public payload: Hotel) {}
}
export class RefreshCart {
  public static readonly type = '[CART] Refresh Cart';
  constructor() {}
}
