import {Component} from '@angular/core';
import {Order} from "../../models/order";
import {OrdersService} from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css', '../../vendor/fontawesome-free/css/all.min.css']
})
export class OrdersComponent {

  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.ordersService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  onDelete(orderId: string) {
    this.ordersService.deleteOrder(orderId).subscribe(() => {
      this.load();
    });
  }
}
