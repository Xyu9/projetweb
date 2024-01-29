import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  providers: [DatePipe]
})

export class ArticlesComponent {

  @Input() title!: string;
  @Input() message!: string;
  @Input() createdAt!: Date;


  @Output() ArticleEvent = new EventEmitter<{ title: string; message: string; createdAt: Date }>();



  sendArticleInfo(): void {
    // Emit the event with article information
    this.ArticleEvent.emit({ title: this.title, message: this.message, createdAt: this.createdAt });
  }

  constructor(private datePipe: DatePipe) {}

  public formatCreatedAt(): string {
    return this.datePipe.transform(this.createdAt, 'short') || '';
  }




}
