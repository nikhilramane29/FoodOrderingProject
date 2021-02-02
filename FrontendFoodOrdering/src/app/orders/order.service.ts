import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private location: Location) {}

  fetchOrders() {
    return this.http.get<Order[]>(BACKEND_URL + '/order');
  }

  placeOrder() {
    return this.http.post<Order>(BACKEND_URL + '/order/place', {});
  }

  updateStatusById(orderId: number, status: string) {
    this.http
      .post(BACKEND_URL + '/order/' + orderId, status)
      .subscribe((res) => {
        this.location.back();
      });
  }

  fetchOrdersByHotelId(hotelId) {
    return this.http.get<Order[]>(BACKEND_URL + '/order/' + hotelId);
  }
}
