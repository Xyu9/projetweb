
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ShowArticlesComponent } from './menu/show-articles/show-articles.component';
import { AddArticlesComponent } from './menu/add-articles/add-articles.component';
import { AuthGuard } from "./auth.guard";
import { ArticlesGuard } from "./articles.guard";

export const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'showArticles', component: ShowArticlesComponent, canActivate: [ArticlesGuard] },
  { path: 'addArticles', component: AddArticlesComponent, canActivate: [ArticlesGuard] },
  { path: '**', component: MainMenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
