import { Injectable } from '@angular/core';
import { Action, StateContext, State, Selector, Store } from '@ngxs/store';
import { RefreshCart } from 'src/app/cart/store/cart.actions';
import {
  OpenSnackbar,
  StartLoading,
  StopLoading,
} from 'src/app/shared/store/app.actions';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { FetchOrders, FetchOrdersByHotelId, PlaceOrder } from './order.action';

export interface OrderStateModel {
  orders: Order[];
}

export const getOrderInitialState = (): OrderStateModel => ({
  orders: [],
});

@State<OrderStateModel>({
  name: 'orders',
  defaults: getOrderInitialState(),
})
@Injectable()
export class OrderState {
  constructor(private orderService: OrderService, private store: Store) {}

  @Selector()
  public static getState(state: OrderStateModel) {
    return state;
  }

  @Selector()
  public static getOrders(state: OrderStateModel) {
    return state.orders;
  }

  @Action(FetchOrders)
  public loadOrdersForUser({ patchState }: StateContext<OrderStateModel>) {
    this.store.dispatch(new StartLoading());
    return this.orderService.fetchOrders().subscribe((result) => {
      patchState({
        orders: result,
      });
      this.store.dispatch(new StopLoading());
    });
  }

  @Action(PlaceOrder)
  public placeOrder({ patchState, getState }: StateContext<OrderStateModel>) {
    this.store.dispatch(new StartLoading());
    const state = getState();
    return this.orderService.placeOrder().subscribe((result) => {
      const orderList: Order[] = [...state.orders, result];
      patchState({ orders: orderList });
      this.store.dispatch(new StopLoading());
      this.store.dispatch(new RefreshCart());
    });
  }

  @Action(FetchOrdersByHotelId)
  public loadOrdersByHotelId(
    { patchState }: StateContext<OrderStateModel>,
    action: FetchOrdersByHotelId
  ) {
    this.store.dispatch(new StartLoading());
    return this.orderService
      .fetchOrdersByHotelId(action.payload)
      .subscribe((result) => {
        patchState({
          orders: result,
        });
        this.store.dispatch(new StopLoading());
      });
  }
}
