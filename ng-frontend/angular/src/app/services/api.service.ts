import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import * as fromStore from "../../reducers/index";
import { Store } from "@ngrx/store";
import { Customer } from "src/customer/models/customer";

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
    private store: Store<fromStore.State>,
    private router: Router
  ) {}
  getCustomer(id) {
    return this.http.get<Customer>(`/api/customers/id/${id}`).toPromise();
  }
  getCustomerObj(id) {
    return this.http.get<Customer>(`/api/customers/${id}`).toPromise();
  }
  redirectTo(url) {
    this.store.select(fromStore.getLoading).subscribe(loading => {
      if (
        loading == true ||
        (this.store.select(fromStore.getCustomer).subscribe(customer => {
          customer !== null;
        }) &&
          this.store.select(fromStore.getErrors).subscribe(errors => {
            errors == null;
          }))
      ) {
        this.router.navigate(["subscribed"]);
      } else {
        return null;
      }
    });
  }
}
