import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Store, select, State } from "@ngrx/store";
import { Router } from "@angular/router";
import { Observable, from } from "rxjs";
import * as fromStore from "../../../reducers/index";
import { Customer } from "src/customer/models/customer";
import { AuthActions } from "../../../actions/index";

import { GetCustomerService } from "src/app/services/api.service";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  tracking_guid$: Observable<string>;
  submitted: boolean;
  customer$: Observable<Customer>;
  errors$: Observable<object>;
  customer: Customer;
  error_status: boolean;

  constructor(
    private store: Store<fromStore.State>,
    private router: Router,
    public api: GetCustomerService
  ) {}

  ngOnInit() {
    this.customer$ = this.store.select(fromStore.getCustomer);
  }

  formSubmitted(customerObj) {
    this.store.select(fromStore.getTrackingGuid).subscribe(guid => {
      this.customer = customerObj;
      this.customer.tracking_guid = guid;
      this.store.dispatch(new AuthActions.Register(this.customer));
      this.errors$ = this.store.select(fromStore.getErrors);
      if (this.errors$ !== null || undefined) {
        this.error_status = true;
      }
    });
  }
}
