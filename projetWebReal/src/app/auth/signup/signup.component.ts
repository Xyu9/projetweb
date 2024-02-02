// Import statements
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

// Add other imports as needed for your Angular Material components
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {NotificationService} from "../../notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  @Output() signUpEvent = new EventEmitter<{ username: string, password: string }>();
  signupForm: FormGroup;

  constructor(private notificationService: NotificationService,private formBuilder: FormBuilder, private userService: UserService, private routeur: Router) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;

      if (formData.password === formData.passwordConfirm) {
        // Call the registration function in the UserService
        this.userService.register({
          username: formData.username,
          password: formData.password
        }).subscribe(
          (response) => {

            this.notificationService.showNotification('Création du compte réussie');
            this.routeur.navigate(['/']);
          },
          (error) => {
            console.error('Registration error:', error);
            if (error.status === 0) {
              this.notificationService.showNotification(error);
              console.error('Network error or CORS issue. Check server configuration and network connection.');
            } else {
              this.notificationService.showNotification(error);
              console.error('Server returned error:', error.status, error.statusText);
            }
          }
        );
      } else {
        this.notificationService.showNotification('Les mots de passe ne correspondent pas');
      }
    }
  }
}
