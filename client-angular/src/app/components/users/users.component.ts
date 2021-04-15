import {Component} from '@angular/core';
import {User} from "../../models/user";
import {UsersService} from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../vendor/fontawesome-free/css/all.min.css']
})
export class UsersComponent {

  users: User[] = [];

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onAdd(name: string, email: string, password: string) {
    this.usersService.addUser(name, email, password).subscribe(() => {
      this.load();
    });
  }

  onDelete(userId: string) {
    this.usersService.deleteUser(userId).subscribe(() => {
      this.load();
    });
  }

  handlePanel(action: string) {
    this.load();
  }
}
