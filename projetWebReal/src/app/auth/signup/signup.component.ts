// Import statements
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

// Add other imports as needed for your Angular Material components
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  @Output() signUpEvent = new EventEmitter<{ username: string, password: string }>();
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
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
            console.log('Registration successful:', response);
            // You can add other actions here, e.g., redirect to a login page
          },
          (error) => {
            console.error('Registration error:', error);
            if (error.status === 0) {
              console.error('Network error or CORS issue. Check server configuration and network connection.');
            } else {
              console.error('Server returned error:', error.status, error.statusText);
              // Handle the error (display an error message, for example)
            }
          }
        );
      } else {
        console.error('Passwords do not match');
      }
    }
  }
}
