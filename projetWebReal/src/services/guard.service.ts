// guard.service.ts
import { Injectable } from '@angular/core';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor(router: Router) {

  }

  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    return user !== null;
  }
}
