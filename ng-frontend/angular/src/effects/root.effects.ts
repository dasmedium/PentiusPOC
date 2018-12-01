import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { catchError, map, mergeMap, mapTo } from "rxjs/operators";

// import { AuthActions } from "../actions/index";
// const { GetGuid, GetGuidError, GetGuidSuccess } = AuthActions;
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
@Injectable()
export class RegisterEffects {
  @Effect()
  getGuid: Observable<Action> = this.actions$.pipe(
    ofType("[Auth] Register"),
    switchMap(payload =>
      this.http.post("/api/customers/add", payload).pipe(
        map(res => ({ type: "[Auth] Register Redirect", payload: res })),

        catchError(err => of({ type: "[Auth] Register Failure", payload: err }))
      )
    )
  );

  constructor(private http: HttpClient, private actions$: Actions) {}
}
