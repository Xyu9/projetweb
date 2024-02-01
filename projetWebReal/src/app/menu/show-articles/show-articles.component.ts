import { Component, OnInit } from '@angular/core';
import { articlesService } from '../../../services/articles.service';

@Component({
  selector: 'app-show-articles',
  templateUrl: './show-articles.component.html',
  styleUrls: ['./show-articles.component.scss']
})
export class ShowArticlesComponent implements OnInit {

  articles: any[] = [];

  constructor(private articlesService: articlesService) {}

  ngOnInit(): void {

    const userId = localStorage.getItem('user');

    // Check if userId exists before making the request
    if (userId) {
      // Call the service method to get articles by user
      this.articlesService.getAllArticlesByUser(userId).subscribe(
        response => {
          // Update the articles variable with the received data
          this.articles = response.articles;

        },
        error => {
          console.error('Error fetching articles:', error);
          // Handle error as needed (e.g., show a user-friendly message)
        }
      );
    } else {
      console.error('User ID not found in localStorage.');
      // Handle the case where the user ID is not found in localStorage
    }
  }

  handleArticleEvent(articleInfo: { title: string, content: string, createdAt: string }): void {
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

    let result = '';

    if (days > 0) {
      result = `${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      result = `${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      result = `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      result = `${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
    return `il y a ${result}`;
  }


}