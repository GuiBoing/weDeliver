import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabCouponsComponent } from './tab-coupons/tab-coupons.component';
import { HomeComponent } from './home/home.component';
import { CouponAddComponent } from './coupon-add/coupon-add.component';
import { HowToComponent } from './how-to/how-to.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path: '#',
    redirectTo:'home',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'howto',
    component: HowToComponent,
    pathMatch: 'full'
  },
  {
    path:'cupoms',
    component: TabCouponsComponent,
    pathMatch: 'full'
  },
  {
    path:'coupon-add',
    component: CouponAddComponent,
    pathMatch: 'full'
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
