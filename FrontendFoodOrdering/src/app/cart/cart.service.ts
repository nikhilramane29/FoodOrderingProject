import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from './cart-item.model';

const BACKEND_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  fetchCart() {
    return this.http.get<CartItem[]>(BACKEND_URL + '/cart');
  }

  removeCartItem(id: number) {
    return this.http.delete<CartItem[]>(BACKEND_URL + '/cart/' + id);
  }

  addCartItem(cartItemToAdd: CartItem) {
    return this.http.post<CartItem[]>(BACKEND_URL + '/cart', cartItemToAdd);
  }

  clearCart() {
    return this.http.delete(BACKEND_URL + '/cart');
  }

  updateCartItemQty(cartItemToBeUpdated: CartItem) {
    return this.http.put<CartItem>(
      BACKEND_URL + '/cart/updateQty',
      cartItemToBeUpdated
    );
  }
}
