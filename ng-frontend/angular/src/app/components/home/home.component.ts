import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../reducers/index";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  tracking_guid$: string;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.select(fromStore.getTrackingGuid).subscribe(guid => {
      this.tracking_guid$ = guid;

      localStorage.setItem("tracking_guid", this.tracking_guid$);
    });
  }
}
