import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Form and Form Group
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//Firebase Service
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule],  // For form handling],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService,private route:Router) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    
  }
  async onSubmit() {
    if (this.resetForm.valid) {
      const {email} = this.resetForm.value;
      try {
        await this.authService.forgetPassword(email);
        localStorage.setItem("email",email);
        alert('Successfull Forgot password');
        this.route.navigateByUrl("/set");
      } catch (error) {
        alert('Reset Password failed: ' + error);
      }
    }
  }
}
