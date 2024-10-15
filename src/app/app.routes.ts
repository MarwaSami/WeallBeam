import { Routes } from '@angular/router';
// Auth Component 
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { SetPasswordComponent } from './set-password/set-password.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'signup', component: RegisterComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'set', component: SetPasswordComponent},
];
