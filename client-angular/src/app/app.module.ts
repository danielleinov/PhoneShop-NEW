import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import {AppComponent} from './app.component';
import {PhonesComponent} from './components/phones/phones.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { UpdatePhoneComponent } from './components/update-phone/update-phone.component';
import { UpdateReviewComponent } from './components/update-review/update-review.component';
const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PhonesComponent,
    UsersComponent,
    DashboardComponent,
    ReviewsComponent,
    BarChartComponent,
    UpdatePhoneComponent,
    UpdateReviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
