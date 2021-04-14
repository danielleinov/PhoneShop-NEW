import { Component, OnInit } from '@angular/core';
import {Phone} from "../../models/phone";
import {PhonesService} from "../../services/phones.service";
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  phones: Phone[] = [];
  users: User[] = [];

  constructor(private phonesService: PhonesService,
              private usersService: UsersService){}

  ngOnInit() {
    this.load();
  }

  load() {
    this.phonesService.getPhones().subscribe(data => {
      this.phones = data;
    });

    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    })
  }

}
