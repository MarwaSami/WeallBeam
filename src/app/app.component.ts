import { Component } from '@angular/core';
// import {} from '@angular/compiler';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { NgModel } from '@angular/forms';
// AngularFireModule.initializeApp(environment.firebase),
//     AngularFireAuthModule
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegisterComponent,SigninComponent,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WeallBeam';
}
