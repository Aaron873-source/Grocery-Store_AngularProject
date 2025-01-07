import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    //Before sending the user to the login page, we need to save the url of the page they were on to local storage
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    //Then after the user is sent to Google for authentication
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider)
    ;
  }

  logout() {
    this.afAuth.signOut();
  }
}
