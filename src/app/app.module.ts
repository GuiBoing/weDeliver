import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CouponListComponent } from "./coupon-list/coupon-list.component";
import { CouponDetailComponent } from "./coupon-detail/coupon-detail.component";
import { TabCouponsComponent } from "./tab-coupons/tab-coupons.component";
import { CouponAddComponent } from "./coupon-add/coupon-add.component";
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowToComponent } from './how-to/how-to.component';

@NgModule({
  declarations: [
    AppComponent,
    CouponListComponent,
    CouponDetailComponent,
    TabCouponsComponent,
    CouponAddComponent,
    HomeComponent,
    HowToComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
