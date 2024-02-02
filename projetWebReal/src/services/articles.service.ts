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
    let errorMessage = 'Une erreur inconnue s\'est produite';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur : ${error.error.message}`;
    } else if (error.status === 401) {

      if (error.error.message === 'Nom d\'utilisateur ou mot de passe incorrect') {
        errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
      } else if (error.error.message === 'Jeton non valide') {
        errorMessage = 'Jeton non valide';
      } else {
        errorMessage = 'Non autorisé'; // Message générique pour les autres cas 401
      }
    } else if (error.status === 500) {
      errorMessage = 'Erreur interne du serveur';
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
