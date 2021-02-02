import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app.state';
import { Order } from '../order.model';
import { FetchOrders } from '../store/order.action';
import { OrderState } from '../store/order.state';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css'],
})
export class ViewOrdersComponent implements OnInit {
  @Select(OrderState.getOrders) orders$: Observable<Order[]>;
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;

  hotelId: number;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchOrders());
  }
}
