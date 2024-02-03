import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {articlesService} from "../../../services/articles.service"
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Article} from "../../models/articles";
import {ArticleController} from "../../../../api/controllers/articleController";
import {UUID} from "node:crypto"
import {NotificationService} from "../../notification.service";

@Component({
  selector: 'app-mod-articles',
  templateUrl: './mod-articles.component.html',
  styleUrls: ['./mod-articles.component.scss']
})
export class ModArticlesComponent {

  _id: UUID;
  newTitle: string;
  newContent: string;

  constructor(
    private articleService: articlesService,
    public dialogRef: MatDialogRef<ModArticlesComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { _id: UUID,title: string, content: string }
  ) {

    this._id = data._id;
    this.newTitle = data.title;
    this.newContent = data.content;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


  onSaveClick(): void {

    console.log("test id" + this._id)
    const updatedData = {
      _id: this._id,
      title: this.newTitle,
      content: this.newContent,
      date: new Date().toISOString()
    };


    this.articleService.updateArticle(updatedData).subscribe(
      (response: any) => {

        this.notificationService.showNotification('article bien modifié');
        this.dialogRef.close(updatedData);
      },
      (error: HttpErrorResponse) => {
        this.notificationService.showNotification(error);
        console.error('Error during article update:', error);

      }
    );
  }

}
