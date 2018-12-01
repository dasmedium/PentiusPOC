import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
  template: `
    <form
      #form="ngForm"
      (ngSubmit)="onSubmit(form.value)"
      name="form"
      id="theForm"
      novalidate="novalidate"
    >
      <fieldset ngModelGroup="customer">
        <label>Firstname:</label> <input type="text" name="firstName" ngModel />

        <label>Lastname:</label> <input type="text" name="lastName" ngModel />

        <label>Street:</label> <input type="text" name="email" ngModel />

        <label>Zip:</label> <input type="text" name="zipCode" ngModel />
      </fieldset>
      <label>Password:</label> <input type="text" name="password" ngModel />

      <button type="submit">Submit</button>
    </form>
  `
})
export class FormComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
