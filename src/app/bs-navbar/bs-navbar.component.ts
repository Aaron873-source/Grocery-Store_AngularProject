import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@firebase/auth-types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css',
})
export class BsNavbarComponent implements OnDestroy {
  user: User | null = null;
  private authSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth) {
    this.authSubscription = this.afAuth.authState.subscribe((user) => {
      this.user = user;
      console.log('Auth State Changed:', user);
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.afAuth.signOut();
  }
}
