import { Action } from "@ngrx/store";
import { Customer } from "../customer/models/customer";
import { ApiService, GetCustomerService } from "../app/services/api.service";
import { FunctionCall } from "@angular/compiler";

export enum AuthActionTypes {
  Register = "[Auth] Register",
  RegisterFailure = "[Auth] Register Failure",
  RegisterRedirect = "[Auth] Register Redirect",
  GetGuid = "[Auth] Get Guid",
  GetGuidSuccess = "[Auth] Get Guid Success",
  GetGuidError = "[Auth] Get Guid Error",
  GetCustomer = "[Auth] Get Customer",
  GetCustomerSuccess = "[Auth] Get Customer Success",
  GetCustomerError = "[Auth] Get Customer Error"
}

export class GetGuid implements Action {
  readonly type = AuthActionTypes.GetGuid;
}
export class GetGuidSuccess implements Action {
  readonly type = AuthActionTypes.GetGuidSuccess;

  constructor(public payload: { tracking_guid: string }) {}
}
export class GetGuidError implements Action {
  readonly type = AuthActionTypes.GetGuidError;

  constructor(public payload: { error: object }) {}
}

export class Register implements Action {
  readonly type = AuthActionTypes.Register;

  constructor(public payload: ApiService<Customer>) {}
}

export class RegisterRedirect implements Action {
  readonly type = AuthActionTypes.RegisterRedirect;

  constructor(public payload: { id: number }) {}
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.RegisterFailure;

  constructor(public payload: { error: Error }) {}
}

export class GetCustomer implements Action {
  readonly type = AuthActionTypes.GetCustomer;

  constructor(public payload: { id: number }) {}
}
export class GetCustomerSuccess implements Action {
  readonly type = AuthActionTypes.GetCustomerSuccess;

  constructor(public payload: { customer: Customer }) {}
}
export class GetCustomerError implements Action {
  readonly type = AuthActionTypes.GetCustomerError;

  constructor(public payload: { error: object }) {}
}

export type AuthActionsUnion =
  | Register
  | RegisterFailure
  | RegisterRedirect
  | GetGuid
  | GetGuidSuccess
  | GetGuidError
  | GetCustomer
  | GetCustomerSuccess
  | GetCustomerError;
