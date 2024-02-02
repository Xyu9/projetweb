// user.service.ts

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from '../environments/environment'
import { Article } from "../app/models/articles"
import {UUID} from "node:crypto";

@Injectable({
  providedIn: 'root'
})
export class articlesService {

  baseUrl = environment.baseUrl


  constructor(private http: HttpClient) {}



  addArticle(user: { title: string, content: string, date: string, user:string | null }): Observable<any> {
    const url = `${this.baseUrl}/articles/add`;
    return this.http.post(url, user).pipe(
      catchError(this.handleError)
    );
  }
  getAllArticlesByUser(username: string): Observable<any> {
    const url = `${this.baseUrl}/articles/getByUser`;
    return this.http.post(url, { user: username }).pipe(
      catchError(this.handleError)
    );
  }
  getAllArticles(): Observable<any> {
    const url = `${this.baseUrl}/articles/getAll`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  /*updateArticle(articleInfo: {
    date: string;
    _id: `${string}-${string}-${string}-${string}-${string}`;
    title: string;
    content: string
  }): Observable<any> {
    const url = `${this.baseUrl}/update`;
    return this.http.put(url, articleInfo);
  }*/


  updateArticle(updatedData: { _id: UUID; title: string; content: string; date: string }): Observable<any> {
    const url = `${this.baseUrl}/articles/update`;
    return this.http.put(url, updatedData).pipe(
      catchError(this.handleError)
    );
  }
  deleteArticle(_id: UUID): Observable<any> {
    const url = `${this.baseUrl}/articles/delete`;
    return this.http.delete(url, { body: { id: _id } }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 401) {
      errorMessage = 'Invalid username or password';
    } else if (error.status === 500) {
      errorMessage = 'Internal Server Error';
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
