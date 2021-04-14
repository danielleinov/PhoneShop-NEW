import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from "./components/list/list.component";
import { UsersComponent } from "./components/users/users.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ReviewsComponent} from "./components/reviews/reviews.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'phones', component: ListComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reviews', component: ReviewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
