import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = environment.usersUrl;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  addUser(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/register', {
      name: name,
      email: email,
      password: password
    });
  }

  getUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user._id}`;
    return this.http.patch<User>(url, {displayName: user.name});
  }

  deleteUser(id: string): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url);
  }
}
