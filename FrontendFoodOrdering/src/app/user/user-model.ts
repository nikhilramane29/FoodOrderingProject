import { Address } from '../shared/address.model';

export interface User {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  address: Address;
}
