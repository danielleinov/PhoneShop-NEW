import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhonesComponent } from "./components/phones/phones.component";
import { UsersComponent } from "./components/users/users.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ReviewsComponent} from "./components/reviews/reviews.component";
import {UpdatePhoneComponent} from "./components/update-phone/update-phone.component";
import {UpdateReviewComponent} from "./components/update-review/update-review.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuardService as AuthGuard} from './services/auth-guard.service';
import {OrdersComponent} from "./components/orders/orders.component";
import {OrdersForUserComponent} from "./components/orders-for-user/orders-for-user.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate : [AuthGuard] },
  { path: 'phones', component: PhonesComponent, canActivate : [AuthGuard] },
  { path: 'phones/:id', component: UpdatePhoneComponent, canActivate : [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate : [AuthGuard] },
  { path: 'reviews', component: ReviewsComponent, canActivate : [AuthGuard] },
  { path: 'reviews/:id', component: UpdateReviewComponent, canActivate : [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate : [AuthGuard] },
  { path: 'usersMinOrder', component: OrdersForUserComponent, canActivate : [AuthGuard] },
  { path: 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
