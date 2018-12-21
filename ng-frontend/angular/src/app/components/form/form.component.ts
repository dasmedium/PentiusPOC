import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
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
