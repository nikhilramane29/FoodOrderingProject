import { Address } from '../shared/address.model';
import { User } from '../user/user-model';
import { MenuItem } from './menu-item.model';

export interface Hotel {
  id: number;
  hotelName: string;
  mobileNo: number;
  image?;
  imageContentType?: string;
  picture?;
  menuItems?: MenuItem[];
  address?: Address;
  vendor?: User;
}
