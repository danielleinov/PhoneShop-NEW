import {Component, OnInit} from '@angular/core';
import {Phone} from "../../models/phone";
import {PhonesService} from "../../services/phones.service";
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {ReviewsService} from "../../services/reviews.service";
import {Review} from "../../models/review";
import {RealtimeService} from "../../services/realtime.service";
import {OrdersService} from "../../services/orders.service";
import {Order} from "../../models/order";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  phones: Phone[] = [];
  users: User[] = [];
  reviews: Review[] = [];
  orders: Order[] = [];

  chartData = []
  activeSessionsCounter: Number;

  constructor(private phonesService: PhonesService,
              private usersService: UsersService,
              private reviewsService: ReviewsService,
              private ordersService: OrdersService,
              private realtimeService: RealtimeService) {
    realtimeService.currentCounter.subscribe(counter => this.activeSessionsCounter = counter);
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.phonesService.getPhones().subscribe(data => {
      this.phones = data;
      this.chartData.push({"Component": "Phones", "Count": data.length});
    });

    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      this.chartData.push({"Component": "Users", "Count": data.length});
    })

    this.reviewsService.getReviews().subscribe(data => {
      this.reviews = data;
      this.chartData.push({"Component": "Reviews", "Count": data.length});
    })

    this.ordersService.getOrders().subscribe(data => {
      this.orders = data;
      this.chartData.push({"Component": "Orders", "Count": data.length});
    })
  }

  onUpdateActiveSessions(newCount: Number) {
    this.realtimeService.updateCurrent(newCount);
  }

}
