import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {UUID} from "node:crypto"

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  providers: [DatePipe]
})

export class ArticlesComponent {

  @Input() id!: UUID;
  @Input() title!: string;
  @Input() content!: string;
  @Input() createdAt!: string;


  @Output() ArticleEvent = new EventEmitter<{ id: UUID,title: string; content: string; createdAt: string }>();

  constructor(private datePipe: DatePipe) {}


  ngOnInit() {
    console.log('Received article2:', { id: this.id,title: this.title, content: this.content, createdAt: this.createdAt });
  }

  ModifInfo(): void {
    // Emit the event with article information
    this.ArticleEvent.emit({ id: this.id,title: this.title, content: this.content, createdAt: this.createdAt });
  }
  DeleteInfo(): void {
    // Emit the event with article information
    this.ArticleEvent.emit({ id: this.id, title: this.title, content: this.content, createdAt: this.createdAt });
  }



  public formatCreatedAt(): string {
    console.log('Formatting createdAt:', this.createdAt);
    return this.datePipe.transform(this.createdAt, 'short') || '';
  }




}
