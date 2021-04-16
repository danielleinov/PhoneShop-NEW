import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhonesComponent } from "./components/phones/phones.component";
import { UsersComponent } from "./components/users/users.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ReviewsComponent} from "./components/reviews/reviews.component";
import {UpdatePhoneComponent} from "./components/update-phone/update-phone.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'phones', component: PhonesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'phones/:id', component: UpdatePhoneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
