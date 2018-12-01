import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";

export const selectAuthstate = createFeatureSelector<fromAuth.State>("auth");
export const getTrackingGuid = createSelector(
  selectAuthstate,
  fromAuth.getTrackingGuid
);
export const getErrors = createSelector(
  selectAuthstate,
  fromAuth.getErrors
);
export const getCustomer = createSelector(
  selectAuthstate,
  fromAuth.getCustomer
);

export interface State {
  auth: fromAuth.State;
}
