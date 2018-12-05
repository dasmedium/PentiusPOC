import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../reducers/index";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { GetCustomerService } from "../app/services/api.service";
import { switchMap, take } from "rxjs/operators";
import { catchError, map, mergeMap, takeUntil } from "rxjs/operators";
import { AuthActions } from "src/actions";
import { AuthActionTypes } from "src/actions/auth.actions";
import { Router } from "@angular/router";
import { Customer } from "src/customer/models/customer";

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

  constructor(private http: HttpClient, private actions$: Actions) {}
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
