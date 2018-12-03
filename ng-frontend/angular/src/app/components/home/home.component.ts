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
  tracking_guid$: Observable<string>;

  constructor(private store: Store<fromStore.State>, private router: Router) {
    this.tracking_guid$ = store.select(fromStore.getTrackingGuid);
  }

  ngOnInit() {
    this.tracking_guid$.subscribe(async (cookieString: string) => {
      await localStorage.setItem("tracking_guid", cookieString);
    });
  }
}
