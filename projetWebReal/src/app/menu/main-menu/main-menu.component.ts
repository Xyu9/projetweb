import { Component } from '@angular/core';
import { articlesService } from '../../../services/articles.service';
import { UserService } from '../../../services/user.service';

import { GuardService} from "../../../services/guard.service"
import {UUID} from "node:crypto";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {




  articles: any[] = [];

  constructor(private userService: UserService,private articlesService: articlesService, private  guardService: GuardService) {}

  ngOnInit(): void {
    this.articlesService.getAllArticles().subscribe(
      response => {
        // Update the articles variable with the received data
        this.articles = response.articles;
        console.log(this.articles)

      },
      error => {
        console.error('Error fetching articles:', error);
        // Handle error as needed
      }
    );
  }

  getLogged(){

    return !this.guardService.isLoggedIn();
  }

  logout(): void {
    /*this.userService.login({ username: this.username, password: this.password }).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('user', this.username);

        this.routeur.navigate(['/']);
      },
      error => {
        console.error(error);
      }
    );*/

    localStorage.removeItem('user');
  }

  handleArticleEvent(articleInfo: { id: UUID; title: string; content: string; createdAt: string }): void {
    // Do something with the emitted article information
    console.log(articleInfo);
  }


  formatTimeSinceCreation(createdAt: string): string {
    const articleDate = new Date(createdAt); // Parse the string to Date
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - articleDate.getTime();

    // Calculate elapsed time in seconds, minutes, hours, etc.
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }




  titreEnvoyer : String = 'test';
}
