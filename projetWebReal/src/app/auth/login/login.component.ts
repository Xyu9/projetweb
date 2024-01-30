// login.component.ts
import { Component } from '@angular/core';

import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  login(): void {

    this.userService.login({ username: this.username, password: this.password }).subscribe(

      response => console.log(response),

      error => console.error(error)
    );
  }
}
