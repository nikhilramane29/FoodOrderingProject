import { MenuItem } from '../hotels/menu-item.model';

export interface CartItem {
  id?: number;
  item: MenuItem;
  quantity: number;
}
