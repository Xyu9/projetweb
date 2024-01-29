import { Component, Input } from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";

import { ArticleComponent } from "../articles/articles.component";
import {DatePipe} from "@angular/common";
import { CommonModule } from '@angular/common';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

import { MatFormField } from '@angular/material/form-field';


@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    MatFormField,
    DatePipe,
    ArticleComponent,
    CommonModule,
    MatCard,
    MatCardContent,
    MatToolbar,
    MatButton,
    RouterLink
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',

})
export class MainMenuComponent {


  articles = [
    {
      title: 'Article 1',
      message: 'This is the content of article 1.',
      createdAt: new Date()
    },
    {
      title: 'Article 2',
      message: 'This is the content of article 1.',
      createdAt: new Date()
    },
    {
      title: 'Article 3',
      message: 'This is the content of article 1.',
      createdAt: new Date()
    },

  ];

  handleArticleEvent(articleInfo: { title: string, message: string, createdAt: Date }): void {
    // Do something with the emitted article information
    console.log(articleInfo);
  }



  titreEnvoyer : String = 'test';
  getCurrentDate(): Date {
    return new Date();
  }
}
