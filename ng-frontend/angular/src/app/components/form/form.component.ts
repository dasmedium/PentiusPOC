import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Store, select, State } from "@ngrx/store";
import { Router } from "@angular/router";
import { Observable, from } from "rxjs";
import * as fromStore from "../../../reducers/index";
import { Customer } from "src/customer/models/customer";
import { AuthActions } from "../../../actions/index";
import { stringify } from "@angular/compiler/src/util";
import { ApiService, GetCustomerService } from "src/app/services/api.service";
import { Identifiers } from "@angular/compiler";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  @Output() onSubmited: EventEmitter<any>;
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
  ) {
    this.onSubmited = new EventEmitter();
  }

  ngOnInit() {
    this.errors$ = this.store.select(fromStore.getErrors);
    this.customer$ = this.store.select(fromStore.getCustomer);
  }

  formSubmitted(customerObj) {
    this.customer = customerObj;
    this.store.select(fromStore.getTrackingGuid).subscribe(guid => {
      this.customer.tracking_guid = guid;
    });
    this.store.dispatch(new AuthActions.Register(this.customer));
    this.store.select(fromStore.getErrors).subscribe(error => {
      if (error !== null || undefined) {
        this.error_status = true;
      } else {
        this.error_status = false;
      }
    });
  }
}
