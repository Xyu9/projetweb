// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

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
