import {Component} from '@angular/core';
import {OrdersService} from 'src/app/services/orders.service';
import {UsersMinOrder} from "../../models/usersMinOrder";

@Component({
  selector: 'app-orders-for-user',
  templateUrl: './orders-for-user.component.html',
  styleUrls: ['./orders-for-user.component.css', '../../vendor/fontawesome-free/css/all.min.css']
})
export class OrdersForUserComponent {

  usersWithMinOrders: UsersMinOrder[] = [];
  minOrders: number = 0;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.ordersService.searchUsersWithMinOrders(this.minOrders).subscribe(data => {
      this.usersWithMinOrders = data;
    });
  }

  onSearch(minOrders: number) {
    this.minOrders = isNaN(minOrders) ? 0 : minOrders;
    console.log(this.minOrders)
    this.load();
  }
}
