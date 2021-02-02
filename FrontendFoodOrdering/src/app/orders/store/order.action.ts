export class FetchOrders {
  public static readonly type = '[ORDER] Fetch Orders';
  constructor() {}
}

export class PlaceOrder {
  public static readonly type = '[ORDER] Place Order';
  constructor() {}
}

export class FetchOrdersByHotelId {
  public static readonly type = '[ORDER] Fetch Orders By Hotel Id';
  constructor(public payload: number) {}
}
