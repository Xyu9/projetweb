import { Component, OnInit } from '@angular/core';
import { articlesService } from '../../../services/articles.service';
import {ModArticlesComponent} from "../mod-articles/mod-articles.component";
import {MatDialog} from "@angular/material/dialog";
import {UUID} from "node:crypto";
import {Router} from "@angular/router";
import {NotificationService} from "../../notification.service";


@Component({
  selector: 'app-show-articles',
  templateUrl: './show-articles.component.html',
  styleUrls: ['./show-articles.component.scss']
})
export class ShowArticlesComponent implements OnInit {

  showArticleButtons: boolean = true;

  articles: any[] = [];

  constructor(
    private articlesService: articlesService,
    private dialog: MatDialog,
    private routeur: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  openEditDialog(articleInfo: { _id: UUID,title: string, content: string, createdAt: string }): void {
    const dialogRef = this.dialog.open(ModArticlesComponent, {
      width: '500px',
      data: { _id: articleInfo._id,title: articleInfo.title, content: articleInfo.content }
    });

    dialogRef.afterClosed().subscribe((newContent: any) => {
      if (newContent) {
        this.loadArticles();
        console.log(newContent.data)
      }
    });
  }
  private loadArticles(): void {
    const userId = localStorage.getItem('user');
    if (userId) {
      this.articlesService.getAllArticlesByUser(userId).subscribe(
        response => {
          this.articles = response.articles;
          console.log(this.articles);
        },
        error => {
          this.notificationService.showNotification('erreur en récupérant les articles');
          console.error('erreur en récupérant les articles:', error);
        }
      );
    } else {
      this.notificationService.showNotification('token non valide');

    }
  }

  delete(articleInfo: { _id: UUID, title: string, content: string, createdAt: string }): void {
    // Call the service to delete the article here
    this.articlesService.deleteArticle(articleInfo._id).subscribe(
      (response) => {
        this.loadArticles();
        this.notificationService.showNotification('article bien supprimé');
        console.log('article bien supprimé', response);
      },
      (error) => {
        this.notificationService.showNotification(error);
        console.error('Error deleting article', error);

      }
    );
  }


  formatTimeSinceCreation(createdAt: string): string {
    const articleDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - articleDate.getTime();

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
