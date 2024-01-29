import { Component } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
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
