import { Component } from '@angular/core';

import { NotificationService } from '../../notification.service';
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

  constructor(private notificationService: NotificationService,private userService: UserService, private routeur: Router) {}

  showNotification(): void {

  }

  login(): void {
    this.userService.login({ username: this.username, password: this.password }).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('user', this.username);
        this.notificationService.showNotification('Connexion Réussie');
        this.routeur.navigate(['/']);
      },
      error => {
        this.notificationService.showNotification(error);
        console.error(error);
      }
    );
  }
}
