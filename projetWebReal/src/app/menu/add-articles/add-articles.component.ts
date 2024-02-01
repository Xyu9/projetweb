// Import necessary modules and services
import { Component } from '@angular/core';
import { articlesService } from '../../../services/articles.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.scss']
})
export class AddArticlesComponent {

  articleTitle: string = '';
  articleContent: string = '';

  constructor(private articleService: articlesService) {}

  addArticle() {
    const currentDate = new Date();
    console.log('Title:', this.articleTitle);
    console.log('Content:', this.articleContent);
    console.log('Date:', currentDate.toISOString());
    console.log('utilisateur:', localStorage.getItem('user'));

    // Send data to the API
    this.articleService.addArticle({
      title: this.articleTitle,
      content: this.articleContent,
      date: currentDate.toISOString(),
      user: localStorage.getItem('user')
    }).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Article added successfully:', response);
        // You can add other actions here, e.g., redirect to a list of articles
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding article:', error);
        // Handle the error (display an error message, for example)
      }
    );
  }
}
