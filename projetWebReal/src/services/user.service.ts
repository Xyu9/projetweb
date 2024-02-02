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

  /*login(user: { username: string, password: string }): Observable<any> {
    console.log('Appel services...');
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post(url, user);
  }*/

  login(user: { username: string, password: string }): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;

    return this.http.post(url, user).pipe(
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
