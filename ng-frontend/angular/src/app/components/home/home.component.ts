import { Component, OnInit } from "@angular/core";
import { InitActions } from "../../../actions/index";
import { Store, select, State } from "@ngrx/store";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import * as fromStore from "../../../reducers/index";
import { Customer } from "src/customer/models/customer";
import { AuthActions } from "../../../actions/index";
import { ApiService } from "../../services/api.service";
import isEmpty from "../../../validation/isEmpty";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  customer: Customer;
  tracking_guid$: Observable<string>;
  errors$: Observable<object>;
  error: boolean;

  constructor(
    private store: Store<fromStore.State>,
    private router: Router,
    private apiService: ApiService
  ) {
    this.tracking_guid$ = store.select(fromStore.getTrackingGuid);
    this.errors$ = store.select(fromStore.getErrors);
  }

  // In JSX this would be way easier...
  checkError() {
    let emptyErrorObj = isEmpty(this.errors$);
    return emptyErrorObj;
  }
  ngOnInit() {
    this.tracking_guid$.subscribe(async (cookieString: string) => {
      await localStorage.setItem("tracking_guid", cookieString);
    });
  }
  onSubmit() {
    console.log("submitted");
    this.store.dispatch(new AuthActions.Register(this.customer));
    this.apiService.addCustomer(this.customer).subscribe(customer => {
      this.customer = customer;
    });
    if ((this.errors$ = null)) {
      this.router.navigateByUrl("/subscribed");
    }
  }
}
