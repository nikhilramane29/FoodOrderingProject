import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Hotel } from '../hotel.model';
import { MenuItem } from '../menu-item.model';
import {
  AddHotelSuccess,
  ClearSelectedHotel,
  DeleteHotel,
  DeleteMenuItem,
  LoadHotelsSuccess,
  LoadSelectedHotelMenuSuccess,
  LoadSelectedHotelSuccess,
  UpdateHotelSuccess,
} from './hotel.actions';

export interface HotelStateModel {
  hotelsList: Hotel[];
  selectedHotel: Hotel;
  selectedHotelMenuItems: MenuItem[];
}

@State<HotelStateModel>({
  name: 'hotel',
  defaults: {
    hotelsList: [],
    selectedHotel: null,
    selectedHotelMenuItems: [],
  },
})
@Injectable()
export class HotelState {
  @Selector()
  public static getState(state: HotelStateModel) {
    return state;
  }

  @Selector()
  public static getHotels(state: HotelStateModel) {
    return state.hotelsList;
  }

  @Selector()
  public static getSelectedHotel(state: HotelStateModel) {
    return state.selectedHotel;
  }

  @Selector()
  public static getSelectedHotelAddress(state: HotelStateModel) {
    return state.selectedHotel.address;
  }

  @Selector()
  public static getSelectedHotelMenu(state: HotelStateModel) {
    return state.selectedHotelMenuItems;
  }

  @Action(ClearSelectedHotel)
  public clearSelectedHotel(
    { patchState }: StateContext<HotelStateModel>,
    action: ClearSelectedHotel
  ) {
    patchState({ selectedHotel: null, selectedHotelMenuItems: [] });
  }

  @Action(LoadHotelsSuccess)
  public hotelListLoaded(
    { patchState }: StateContext<HotelStateModel>,
    action: LoadHotelsSuccess
  ) {
    patchState({ hotelsList: [...action.payload] });
  }

  @Action(LoadSelectedHotelSuccess)
  public selectedHotelLoaded(
    { patchState }: StateContext<HotelStateModel>,
    action: LoadSelectedHotelSuccess
  ) {
    patchState({ selectedHotel: action.payload });
  }

  @Action(LoadSelectedHotelMenuSuccess)
  public loadSelectedHotelMenu(
    { patchState }: StateContext<HotelStateModel>,
    action: LoadSelectedHotelMenuSuccess
  ) {
    patchState({ selectedHotelMenuItems: action.payload });
  }

  @Action(AddHotelSuccess)
  public createHotel(
    { getState, patchState }: StateContext<HotelStateModel>,
    action: AddHotelSuccess
  ) {
    const current = getState();
    const hotelsList = [...current.hotelsList, action.payload];
    patchState({ hotelsList: hotelsList });
  }

  @Action(UpdateHotelSuccess)
  public updateHotel(
    { getState, patchState }: StateContext<HotelStateModel>,
    action: UpdateHotelSuccess
  ) {
    const current = getState();
    let toUpdateHotelsList = [
      ...current.hotelsList.filter((x) => x.id != action.payload.id),
      action.payload,
    ];
    patchState({ hotelsList: toUpdateHotelsList });
  }

  @Action(DeleteHotel)
  public removeHotel(
    { getState, setState }: StateContext<HotelStateModel>,
    action: DeleteHotel
  ) {
    const state = getState();

    const current = {
      hotelsList: [...state.hotelsList.filter((x) => x.id !== +action.payload)],
    };

    setState({
      ...state,
      ...current,
    });
  }

  @Action(DeleteMenuItem)
  public removeSingleCartItem(
    { getState, setState }: StateContext<HotelStateModel>,
    action: DeleteMenuItem
  ) {
    const state = getState();

    const current = {
      selectedHotelMenuItems: [
        ...state.selectedHotelMenuItems.filter((x) => x.id !== action.payload),
      ],
    };

    setState({
      ...state,
      ...current,
    });
  }
}
