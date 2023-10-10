import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {LOGIN_ENDPOINT} from "./app.constants";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(protected userService: UserService, private router: Router, private toastr: ToastrService) {

  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
    this.toastr.info('Successfully logged out.', 'Log out');

  }
  onClickMainPage(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/']);

      // User is not logged in, show a toast notification
      this.toastr.error('You must be logged in to access this feature.', 'Access Denied');
      return;
    }
  }

}
