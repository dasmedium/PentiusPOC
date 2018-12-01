import { Action } from "@ngrx/store";
import { Customer } from "../customer/models/customer";
import { HttpClient } from "@angular/common/http";
import { async } from "@angular/core/testing";
export enum AuthActionTypes {
  Register = "[Auth] Register",
  RegisterFailure = "[Auth] Register Failure",
  RegisterRedirect = "[Auth] Register Redirect",
  GetGuid = "[Auth] Get Guid",
  GetGuidSuccess = "[Auth] Get Guid Success",
  GetGuidError = "[Auth] Get Guid Error"
}
export class Register implements Action {
  readonly type = AuthActionTypes.Register;
  constructor(public payload: Customer) {}
}
export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.RegisterFailure;

  constructor(public payload: { error: any }) {}
}

export class GetGuid implements Action {
  readonly type = AuthActionTypes.GetGuid;
}
export class GetGuidSuccess implements Action {
  readonly type = AuthActionTypes.GetGuidSuccess;

  constructor(public payload: { tracking_guid: number }) {}
}
export class GetGuidError implements Action {
  readonly type = AuthActionTypes.GetGuidError;

  constructor(public payload: { error: object }) {}
}

export class RegisterRedirect implements Action {
  readonly type = AuthActionTypes.RegisterRedirect;
  constructor(public payload: { customer: Customer }) {}
}

export type AuthActionsUnion =
  | Register
  | RegisterFailure
  | RegisterRedirect
  | GetGuid
  | GetGuidSuccess
  | GetGuidError;
