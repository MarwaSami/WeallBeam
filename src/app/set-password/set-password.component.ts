import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//Firebase Services
import { AuthService } from '../services/auth.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-set-password',
  standalone: true,
  imports:[ ReactiveFormsModule,  
    MatIconModule,CommonModule],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.css'
})
export class SetPasswordComponent {
  setpasswordForm: FormGroup;
  hide = true;
  hideconfirm=true;
  constructor(private fb: FormBuilder,private authService: AuthService, private firestore: Firestore,private router: Router) {
    this.setpasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
    
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value ? null : { mismatch: true };
  }
  async onSubmit() {
    if (this.setpasswordForm.valid) {
      const {password } = this.setpasswordForm.value;
      try {
        // const userCredential = await this.authService.register( password);
        // const user = userCredential.user;
       
        alert('Updated successful!');
        this.router.navigateByUrl("/");
        console.log('Form Submitted', this.setpasswordForm.value);
      } catch (error) {
        alert('Update Password failed: ' + error);
      }
    }
  }
}
