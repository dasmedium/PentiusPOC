import { Component, OnInit } from "@angular/core";
import { Customer } from "src/customer/models/customer";
import { Store, select, State } from "@ngrx/store";
import * as fromStore from "../../../reducers/index";
import { Observable } from "rxjs";

@Component({
  selector: "app-subscribe",
  templateUrl: "./subscribe.component.html",
  styleUrls: ["./subscribe.component.css"]
})
export class SubscribeComponent implements OnInit {
  customer$: Observable<Customer>;
  constructor(private store: Store<fromStore.State>) {
    this.customer$ = store.select(fromStore.getCustomer);
  }

  ngOnInit() {}
}
