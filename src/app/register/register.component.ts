
// Form and Form Group
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Import Angular Material components
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//Firebase Service
import { AuthService } from '../services/auth.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,  // For form handling
    MatIconModule,        // For icons (e.g., password visibility)
    MatCheckboxModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent {
  registerForm: FormGroup;
  hide = true;
  hideconfirm=true;
  constructor(private fb: FormBuilder,private authService: AuthService, private firestore: Firestore,private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
    
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value ? null : { mismatch: true };
  }
  async onSubmit() {
    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      try {
        const userCredential = await this.authService.register(email, password);
        const user = userCredential.user;
        await addDoc(collection(this.firestore, 'users'), {
          uid: user.uid,
          firstName,
          lastName,
          email
        });
        alert('Registration successful!');
        this.router.navigateByUrl("/signin");
        console.log('Form Submitted', this.registerForm.value);
      } catch (error) {
        alert('Registration failed: ' + error);
      }
    }
  }

}
