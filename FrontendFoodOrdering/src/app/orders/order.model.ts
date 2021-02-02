import { Address } from '../shared/address.model';
import { Hotel } from '../hotels/hotel.model';
import { MenuItem } from '../hotels/menu-item.model';

export interface Order {
  orderId: number;
  grandTotal: number;
  hotel: Hotel;
  orderItems: OrderItem[];
  customerAddress: Address;
  status: String;
}
export interface OrderItem {
  id: number;
  item: MenuItem;
  quantity: number;
  amount: number;
}
