// Form and Form Group
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Import Angular Material components
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//Firebase Service
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone:true,
  imports:[
    CommonModule,
    MatIconModule,        // For icons (e.g., password visibility)
    ReactiveFormsModule,  // For form handling
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder,private authService: AuthService,private route:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberme: [false]
    });
    
  }
  async onSubmit() {
    if (this.loginForm.valid) {
      const {email, password } = this.loginForm.value;
      try {
        const userCredential = await this.authService.login(email, password);
        const user = userCredential.user;
        localStorage.setItem("user",JSON.stringify(user));
        alert('Login successful!');
        this.route.navigateByUrl("");
      } catch (error) {
        alert('Login failed: ' + error);
      }
    }
  }
}
