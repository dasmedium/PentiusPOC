import { Component, OnInit, DoCheck, AfterViewInit } from "@angular/core";
import { Customer } from "src/customer/models/customer";
import { Store, select, State } from "@ngrx/store";
import * as fromStore from "../../../reducers/index";
import { Observable } from "rxjs";
import { AuthActions } from "src/actions";
import { GetCustomerService } from "src/app/services/api.service";

@Component({
  selector: "app-subscribe",
  templateUrl: "./subscribe.component.html",
  styleUrls: ["./subscribe.component.css"]
})
export class SubscribeComponent implements OnInit {
  customer$: Observable<Customer>;
  constructor(
    private store: Store<fromStore.State>,
    public api: GetCustomerService
  ) {
    this.customer$ = store.select(fromStore.getCustomer);
  }

  ngOnInit() {}
}
