import { Injectable } from "@angular/core";
import { Observable, of, from } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import * as fromStore from "../../reducers/index";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class ApiService<Customer> {
  addCustomer(customer: Customer): Observable<Customer> {
    console.log("called");
    return this.http
      .post<Customer>("/api/customers/add", customer)
      .pipe(catchError(err => of(err)));
  }
  constructor(public http: HttpClient, private store: Store<fromStore.State>) {}
}
