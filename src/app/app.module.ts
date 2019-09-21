import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { MatSliderModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TagInputModule } from "ngx-chips";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, HomepageComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    TagInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
