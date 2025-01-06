import { Component } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private afAuth: AngularFireAuth) {}

  login() {
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithRedirect(provider);
  }
}
