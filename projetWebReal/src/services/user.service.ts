// user.service.ts

import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) {}



  register(user: { username: string, password: string }): Observable<any> {
    console.log('Appel services...');
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post(url, user).pipe(
      catchError(this.handleError)
    );
  }



  login(user: { username: string, password: string }): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;

    return this.http.post(url, user).pipe(
      catchError(this.handleError)
    );
  }

  generateToken(): Observable<any> {
    const url = `${this.baseUrl}/generate-csrf-token`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }


  logout(user: { username: string, password: string }): Observable<any> {
    console.log('Appel services...');
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post(url, user).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur inconnue s\'est produite';

    if (error.error instanceof ErrorEvent) {

      errorMessage = `Erreur : ${error.error.message}`;
    } else if (error.status === 401) {

      if (error.error.message === 'Nom d\'utilisateur ou mot de passe incorrect') {
        errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
      } else if (error.error.message === 'Jeton non valide') {
        errorMessage = 'Jeton non valide';
      } else {
        errorMessage = 'Non autorisé';
      }

    } else if (error.status === 500) {
      errorMessage = 'Erreur interne du serveur';
    } else if (error.status === 405) {
      errorMessage = 'Compte existant';
    } else {
      errorMessage = 'Non autorisé';
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
