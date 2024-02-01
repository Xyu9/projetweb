import { Component } from '@angular/core';

import { UserService } from '../../../services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private routeur: Router) {}

  login(): void {
    this.userService.login({ username: this.username, password: this.password }).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('user', this.username);

        this.routeur.navigate(['/']);
      },
      error => {
        console.error(error);
      }
    );
  }
}
