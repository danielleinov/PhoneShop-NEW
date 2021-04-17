import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UsersMinOrder} from "../models/usersMinOrder";

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersUrl = environment.ordersUrl;

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }

  getOrder(id: string): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  getUsersWithMinimumOrders(id: string): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.get<Order>(url);
  }

  deleteOrder(id: string): Observable<Order> {
    const url = `${this.ordersUrl}/${id}`;
    return this.http.delete<Order>(url);
  }

  searchUsersWithMinOrders(minOrders: number): Observable<UsersMinOrder[]> {
    console.log(minOrders)
    const url = this.ordersUrl + '/find';
    return this.http.get<UsersMinOrder[]>(url, {
      params: {
        num: minOrders.toString()
      }
    });
  }
}
