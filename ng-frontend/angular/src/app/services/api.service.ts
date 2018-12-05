import { Injectable } from "@angular/core";
import { Observable, of, from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError, map, take } from "rxjs/operators";
import * as fromStore from "../../reducers/index";
import { Store } from "@ngrx/store";
import { Customer } from "src/customer/models/customer";
import { AuthActions } from "src/actions";
import { AuthActionTypes } from "src/actions/auth.actions";
import { Action } from "rxjs/internal/scheduler/Action";

@Injectable({
  providedIn: "root"
})
export class ApiService<Customer> {
  constructor() {
    return Customer;
  }
}
@Injectable({
  providedIn: "root"
})
export class GetCustomerService {
  id: number;
  constructor(
    private http: HttpClient,
    private store: Store<fromStore.State>
  ) {}
  getCustomer(id) {
    return this.http.get<Customer>(`/api/customers/id/${id}`).toPromise();
  }
  getCustomerObj(id) {
    console.log("called");
    return this.http.get<Customer>(`/api/customers/${id}`).toPromise();
  }
}
