import { Component, OnInit } from '@angular/core';
import {Phone} from "../../models/phone";
import {PhonesService} from "../../services/phones.service";
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {ReviewsService} from "../../services/reviews.service";
import {Review} from "../../models/review";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  phones: Phone[] = [];
  users: User[] = [];
  reviews: Review[] = [];

  chartData = []

  constructor(private phonesService: PhonesService,
              private usersService: UsersService,
              private reviewsService: ReviewsService){}

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
  }

}
