import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { ArticlesComponent } from './menu/articles/articles.component';

import { HttpClientModule } from "@angular/common/http";

import {MatCard, MatCardContent, MatCardModule} from '@angular/material/card';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AddArticlesComponent } from './menu/add-articles/add-articles.component';
import { ShowArticlesComponent } from './menu/show-articles/show-articles.component';
import { ModArticlesComponent } from './menu/mod-articles/mod-articles.component';

//import '../../api/index';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MainMenuComponent,
    ArticlesComponent,
    AddArticlesComponent,
    ShowArticlesComponent,
    ModArticlesComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardContent,
    MatCard,
    MatToolbar,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
