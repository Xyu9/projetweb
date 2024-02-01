import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {articlesService} from "../../../services/articles.service"
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Article} from "../../models/articles";
import {ArticleController} from "../../../../api/controllers/articleController";
import {UUID} from "node:crypto"

@Component({
  selector: 'app-mod-articles',
  templateUrl: './mod-articles.component.html',
  styleUrls: ['./mod-articles.component.scss']
})
export class ModArticlesComponent {

  id: UUID;
  newTitle: string;
  newContent: string;

  constructor(
    private articleService: articlesService,
    public dialogRef: MatDialogRef<ModArticlesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: UUID,title: string, content: string }
  ) {
    // Initialize properties with existing data
    this.id = data.id;
    this.newTitle = data.title;
    this.newContent = data.content;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  // mod-articles.component.ts
  onSaveClick(): void {
    // Call the updateArticle method from the service
    const updatedData: Article = {
      id: this.id,
      title: this.newTitle,
      content: this.newContent,
      date: '', // You might need to set a date here based on your model
      user: ''  // You might need to set a user here based on your model
    };

    console.log("test1" +updatedData.id)

    // Call the service method and subscribe to the Observable
    this.articleService.updateArticle(updatedData).subscribe(
      (response: any) => {
        console.log('Article modified:', response);
        // Handle the response (if needed)
      },
      (error: HttpErrorResponse) => {
        console.error('Error during article update:', error);
        // Handle the error (display an error message, for example)
      },
      () => {
        // This block will be executed on completion (whether success or error)
        this.dialogRef.close(updatedData);
      }
    );
  }

}
