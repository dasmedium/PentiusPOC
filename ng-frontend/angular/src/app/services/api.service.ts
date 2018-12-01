import { Injectable } from "@angular/core";
import { Customer } from "src/customer/models/customer";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class ApiService {
  addCustomer(customer: Customer): Observable<any> {
    return this.http
      .post<Customer>("/customers/add", customer)
      .pipe(
        catchError(err => of({ type: "[Auth] Register Failure", payload: err }))
      );
  }
  constructor(public http: HttpClient) {}
}
