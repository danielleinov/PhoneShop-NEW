import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Phoney Admin';

  constructor(private authService: AuthService, private router: Router) {
  }

  onLogout() {
    this.authService.removeUserInfo();
    this.router.navigate(['/login']);
  }
}
