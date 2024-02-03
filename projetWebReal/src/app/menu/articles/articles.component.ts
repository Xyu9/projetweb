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

  @Input() _id!: UUID;
  @Input() title!: string;
  @Input() content!: string;
  @Input() createdAt!: string;
  @Input() showButtons: boolean = false;


  @Output() ArticleEvent = new EventEmitter<{ _id: UUID,title: string; content: string; createdAt: string }>();
  @Output() ArticleEvent2 = new EventEmitter<{ _id: UUID,title: string; content: string; createdAt: string }>();


  constructor(private datePipe: DatePipe) {}


  ngOnInit() {
    console.log('Received article2:', { _id: this._id,title: this.title, content: this.content, createdAt: this.createdAt });
  }

  ModifInfo(): void {

    this.ArticleEvent.emit({ _id: this._id,title: this.title, content: this.content, createdAt: this.createdAt });
  }
  DeleteInfo(): void {

    this.ArticleEvent2.emit({ _id: this._id, title: this.title, content: this.content, createdAt: this.createdAt });
  }



  public formatCreatedAt(): string {
    console.log('Formatting createdAt:', this.createdAt);
    return this.datePipe.transform(this.createdAt, 'short') || '';
  }




}
