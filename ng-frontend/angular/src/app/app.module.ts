import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { APP_BASE_HREF } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { InitEffects, RegisterEffects, GetById } from "../effects/root.effects";
import { reducer } from "../reducers/auth.reducer";
import { AppComponent } from "./app.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SubscribeComponent } from "./components/subscribe/subscribe.component";
import { HomeComponent } from "./components/home/home.component";
import { FormComponent } from "./components/form/form.component";
import { FormsModule } from "@angular/forms";
import { ApiService, GetCustomerService } from "./services/api.service";

const appRoutes: Routes = [
  {
    path: "",
    component: AppComponent
  },
  {
    path: "subscribed",
    component: SubscribeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SubscribeComponent,
    HomeComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    EffectsModule.forRoot([InitEffects, RegisterEffects, GetById]),
    StoreModule.forRoot({ auth: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // Retains last 25 states
    }),
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    ApiService,
    GetCustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
