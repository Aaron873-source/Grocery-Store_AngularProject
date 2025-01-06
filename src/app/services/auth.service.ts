import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;
  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  login() {
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider);
  }

  logout() {
    this.afAuth.signOut();
  }
}
