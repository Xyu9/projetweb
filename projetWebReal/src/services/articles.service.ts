// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class articlesService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  addArticle(user: { title: string, content: string, date: string, user:string | null }): Observable<any> {
    console.log('Appel services...');
    const url = `${this.baseUrl}/articles/add`;
    return this.http.post(url, user);
  }
  getAllArticlesByUser(username: string): Observable<any> {
    const url = `${this.baseUrl}/articles/getByUser`;
    return this.http.post(url, { user: username });
  }
  getAllArticles(): Observable<any> {
    const url = `${this.baseUrl}/articles/getAll`;
    return this.http.get(url);
  }


}
