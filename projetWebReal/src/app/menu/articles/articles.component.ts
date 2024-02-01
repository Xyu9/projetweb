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
  @Input() content!: string;
  @Input() createdAt!: string;


  @Output() ArticleEvent = new EventEmitter<{ title: string; content: string; createdAt: string }>();

  constructor(private datePipe: DatePipe) {}


  ngOnInit() {
    console.log('Received article:', { title: this.title, content: this.content, createdAt: this.createdAt });
  }

  sendArticleInfo(): void {
    // Emit the event with article information
    this.ArticleEvent.emit({ title: this.title, content: this.content, createdAt: this.createdAt });
  }



  public formatCreatedAt(): string {
    console.log('Formatting createdAt:', this.createdAt);
    return this.datePipe.transform(this.createdAt, 'short') || '';
  }




}
