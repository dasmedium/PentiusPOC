import { Component, OnInit } from "@angular/core";
import { InitActions } from "../actions/index";
import { Store } from "@ngrx/store";

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
