import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { User } from '../../user/user-model';
import {
  StartLoading,
  StopLoading,
  SetAuthenticated,
  SetUnauthenticated,
  SetAdminTrue,
  SetAdminFalse,
  // GetUserAddress,
  GetUserDetails,
  SetThemeStatus,
  SetVendorTrue,
  SetVendorFalse,
  OpenSnackbar,
} from './app.actions';

export interface AppStateModel {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isVendor: boolean;
  darkModeSwitch: boolean;
  user: User;
}

@State<AppStateModel>({
  name: 'app',
  defaults: {
    isLoading: false,
    isAuthenticated: false,
    isAdmin: false,
    isVendor: false,
    darkModeSwitch: false,
    user: null,
  },
})
@Injectable()
export class AppState {
  constructor(private _snackBar: MatSnackBar) {}

  @Selector()
  public static getState(state: AppStateModel) {
    return state;
  }

  @Selector()
  public static isLoading(state: AppStateModel) {
    return state.isLoading;
  }

  @Selector()
  public static isAdmin(state: AppStateModel) {
    return state.isAdmin;
  }

  @Selector()
  public static isVendor(state: AppStateModel) {
    return state.isVendor;
  }

  @Selector()
  public static isAuthenticated(state: AppStateModel) {
    return state.isAuthenticated;
  }

  @Selector()
  public static isDark(state: AppStateModel) {
    return state.darkModeSwitch;
  }

  @Selector()
  public static User(state: AppStateModel) {
    return state.user;
  }

  @Selector()
  public static userAddress(state: AppStateModel) {
    return state.user.address;
  }

  @Action(StartLoading)
  public startLoading({ patchState }: StateContext<AppStateModel>) {
    patchState({ isLoading: true });
  }

  @Action(StopLoading)
  public stopLoading({ patchState }: StateContext<AppStateModel>) {
    patchState({ isLoading: false });
  }

  @Action(SetAuthenticated)
  public setAuthenticated({ patchState }: StateContext<AppStateModel>) {
    patchState({ isAuthenticated: true });
  }

  @Action(SetUnauthenticated)
  public setUnauthenticated({ patchState }: StateContext<AppStateModel>) {
    patchState({ isAuthenticated: false });
  }

  @Action(SetAdminTrue)
  public setAdminTrue({ patchState }: StateContext<AppStateModel>) {
    patchState({ isAdmin: true });
  }

  @Action(SetAdminFalse)
  public setAdminFalse({ patchState }: StateContext<AppStateModel>) {
    patchState({ isAdmin: false });
  }

  @Action(SetVendorTrue)
  public setVendorTrue({ patchState }: StateContext<AppStateModel>) {
    patchState({ isVendor: true });
  }

  @Action(SetVendorFalse)
  public setVendorFalse({ patchState }: StateContext<AppStateModel>) {
    patchState({ isVendor: false });
  }

  @Action(GetUserDetails)
  public getUserDetails(
    { patchState }: StateContext<AppStateModel>,
    action: GetUserDetails
  ) {
    patchState({ user: action.payload });
  }

  @Action(SetThemeStatus)
  public setThemeStatus(
    { patchState }: StateContext<AppStateModel>,
    action: SetThemeStatus
  ) {
    patchState({ darkModeSwitch: action.payload });
  }

  @Action(OpenSnackbar)
  public openSnackbar(
    { patchState }: StateContext<AppStateModel>,
    action: OpenSnackbar
  ) {
    this._snackBar.open(action.payload, 'OK', {
      duration: 2000,
    });
  }
}
