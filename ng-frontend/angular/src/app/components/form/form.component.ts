import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Store, select, State } from "@ngrx/store";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import * as fromStore from "../../../reducers/index";
import { Customer } from "src/customer/models/customer";
import { AuthActions } from "../../../actions/index";

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

  constructor(private store: Store<fromStore.State>) {
    this.onSubmited = new EventEmitter();
  }

  ngOnInit() {
    this.errors$ = this.store.select(fromStore.getErrors);
    this.tracking_guid$ = this.store.select(fromStore.getTrackingGuid);
    this.customer$ = this.store.select(fromStore.getCustomer);
  }

  formSubmitted(customer) {
    console.log(customer);
    this.store.dispatch(new AuthActions.Register(customer));
    if (this.errors$ !== null || undefined) {
      this.error_status = true;
    } else {
      this.error_status = false;
    }
  }
}
