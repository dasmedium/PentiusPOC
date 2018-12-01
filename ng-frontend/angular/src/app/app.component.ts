import { Component, OnInit } from "@angular/core";
import { InitActions } from "../actions/index";
import { Store, select, State } from "@ngrx/store";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import * as fromStore from "../reducers/index";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(new InitActions.Init());
  }
}
