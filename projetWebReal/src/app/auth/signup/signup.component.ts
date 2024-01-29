import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {


  @Output() signUpEvent = new EventEmitter<{ username: string, password: string }>();

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  onSubmit(): void {

    console.log('Form Values:', this.signupForm.value);

    if (this.signupForm.value.password === this.signupForm.value.passwordConfirm) {
      //todo ajouter a la bd


      this.signUpEvent.emit({
        username: this.signupForm.value.username,
        password: this.signupForm.value.password
      });
    } else {
      // Handle password mismatch
      console.error('Passwords do not match');
    }
  }

}
