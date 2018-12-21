import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { GetCustomerService } from "../app/services/api.service";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AuthActions } from "src/actions";
import { AuthActionTypes } from "src/actions/auth.actions";

// Can check for existing localStorage guid, cookie for user here. Trigger action conditionally
@Injectable()
export class InitEffects {
  @Effect()
  getGuid: Observable<Action> = this.actions$.pipe(
    ofType("[Init] App Initialised"),
    mergeMap(() =>
      this.http.get("/api/generate_guid").pipe(
        map(res => ({ type: "[Auth] Get Guid Success", payload: res })),

        catchError(err => of({ type: "[Auth] Get Guid Error", payload: err }))
      )
    )
  );

  constructor(private http: HttpClient, private actions$: Actions) {}
}
// https://github.com/ngrx/platform/issues/31#issuecomment-308056949
@Injectable()
export class RegisterEffects {
  @Effect()
  sendRegister: Observable<Action> = this.actions$.pipe(
    ofType("[Auth] Register"),
    mergeMap((action: AuthActions.Register) =>
      this.http.post("/api/customers/add", action.payload).pipe(
        map(res => ({
          type: AuthActionTypes.RegisterRedirect,
          payload: res
        })),

        catchError(err =>
          of({ type: AuthActionTypes.RegisterFailure, payload: err })
        )
      )
    )
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    public redirect: GetCustomerService
  ) {}
}
@Injectable()
export class GetById {
  @Effect()
  getCustomerById: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.RegisterRedirect),
    mergeMap((action: AuthActions.RegisterRedirect) =>
      this.http.get(`/api/customers/${action.payload.id}`)
    ),
    map(res => ({
      type: AuthActionTypes.GetCustomerSuccess,
      payload: { customer: res }
    })),
    catchError(err =>
      of({ type: AuthActionTypes.GetCustomerError, payload: err })
    )
  );

  constructor(private http: HttpClient, private actions$: Actions) {}
}
@Injectable()
export class Redirect {
  @Effect({ dispatch: false })
  redirectOnSuccess = this.actions$.pipe(
    ofType(AuthActionTypes.RegisterRedirect),
    map(() => this.redirect.redirectTo(["subscribed"]))
  );

  constructor(
    private actions$: Actions,
    private redirect: GetCustomerService
  ) {}
}
