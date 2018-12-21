import { Component, OnInit } from "@angular/core";
import { Customer } from "src/customer/models/customer";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../reducers/index";

import { GetCustomerService } from "src/app/services/api.service";

@Component({
  selector: "app-subscribe",
  templateUrl: "./subscribe.component.html",
  styleUrls: ["./subscribe.component.css"]
})
export class SubscribeComponent implements OnInit {
  customer: Customer;
  guid: string;
  name: string;
  last_name: string;
  email: string;
  zip_code: number;
  id: number;

  constructor(
    private store: Store<fromStore.State>,
    public api: GetCustomerService
  ) {}

  ngOnInit() {
    this.store.select(fromStore.getCustomer).subscribe(customer => {
      this.name = customer.first_name;
      this.last_name = customer.last_name;
      this.email = customer.email;
      this.zip_code = customer.zip_code;
      this.id = customer.id;
      this.guid = customer.tracking_guid;
    });
  }
}
