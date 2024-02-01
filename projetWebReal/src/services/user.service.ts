// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.post(url, user);
  }

  login(user: { username: string, password: string }): Observable<any> {
    console.log('Appel services...');
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post(url, user);
  }
}
