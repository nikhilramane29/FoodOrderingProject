import { Hotel } from '../hotel.model';
import { MenuItem } from '../menu-item.model';

export class LoadHotelsSuccess {
  public static readonly type = '[HOTEL] Load Hotels Success';
  constructor(public payload: Hotel[]) {}
}

export class LoadSelectedHotelSuccess {
  public static readonly type = '[HOTEL] Load Selected Hotel Success';
  constructor(public payload: Hotel) {}
}

export class LoadSelectedHotelMenuSuccess {
  public static readonly type = '[HOTEL] Load Selected Hotel Menu Success';
  constructor(public payload: MenuItem[]) {}
}

export class AddHotelSuccess {
  public static readonly type = '[HOTEL] Add Hotel Success';
  constructor(public payload: Hotel) {}
}

export class ClearSelectedHotel {
  public static readonly type = '[HOTEL] Clear Selected Hotel';
  constructor() {}
}

export class UpdateHotelSuccess {
  public static readonly type = '[HOTEL] Update Hotel Success';
  constructor(public payload: Hotel) {}
}

export class DeleteHotel {
  public static readonly type = '[HOTEL] Delete Hotel';
  constructor(public payload: string) {}
}

export class DeleteMenuItem {
  public static readonly type = '[HOTEL] Delete Menu Item Success';
  constructor(public payload: number) {}
}
