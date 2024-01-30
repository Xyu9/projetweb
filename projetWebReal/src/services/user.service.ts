// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000'; // Change this to your backend URL

  constructor(private http: HttpClient) {}

  register(user: { username: string, password: string }): Observable<any> {
    console.log('Appel services...');
    const url = `${this.baseUrl}/register`; // Change this to your backend API endpoint
    return this.http.post(url, user);
  }
}
