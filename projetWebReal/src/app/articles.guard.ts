import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GuardService } from '../services/guard.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesGuard implements CanActivate {

  private router: Router;
  private guardService: GuardService;

  constructor() {
    this.router = new Router();
    this.guardService = new GuardService(this.router);
  }

  canActivate(): boolean {
    if (!this.guardService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
