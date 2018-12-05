import { Component, OnInit } from "@angular/core";

import { Store, select, State } from "@ngrx/store";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import * as fromStore from "../../../reducers/index";
import { v4, v4String } from "uuid/interfaces";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  tracking_guid$: string;

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit() {
    this.store.select(fromStore.getTrackingGuid).subscribe(guid => {
      this.tracking_guid$ = guid;

      localStorage.setItem("tracking_guid", this.tracking_guid$);
    });
  }
}
