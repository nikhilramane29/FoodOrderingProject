import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/store/app.state';
import { Order } from '../order.model';
import { OrderService } from '../order.service';
import { FetchOrdersByHotelId } from '../store/order.action';
import { OrderState } from '../store/order.state';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.css'],
})
export class EditOrdersComponent implements OnInit {
  @Select(OrderState.getOrders) orders$: Observable<Order[]>;
  @Select(AppState.isLoading) isLoading$: Observable<boolean>;
  @Select(AppState.isAdmin) isAdmin$: Observable<boolean>;

  updatedOrderStatus: { orderId: number; newStatus: string }[] = [];

  hotelId: number;
  status: string[] = ['PENDING', 'DISPATCHED', 'DELIVERED', 'CANCELLED'];

  constructor(
    private store: Store,
    public route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.hotelId = +paramMap.get('hotelId');
      }
    });
    this.isAdmin$.subscribe((res) => {
      if (res) {
        this.store.dispatch(new FetchOrdersByHotelId(this.hotelId));
      }
    });
  }

  updateStatus(id: number) {
    let newStatus = this.updatedOrderStatus.find((x) => x.orderId == id)
      .newStatus;
    console.log('updating order id: ' + id + ' with status: ' + newStatus);
    this.orderService.updateStatusById(id, newStatus);
  }

  selectChanged(orderId: number, event) {
    let item = this.updatedOrderStatus.find((x) => x.orderId == orderId);

    if (item) {
      this.updatedOrderStatus.find((x) => x.orderId == item.orderId).newStatus =
        event.value;
    } else {
      this.updatedOrderStatus.push({
        orderId: orderId,
        newStatus: event.value,
      });
    }
  }
}
