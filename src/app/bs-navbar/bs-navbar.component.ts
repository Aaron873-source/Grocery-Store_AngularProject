import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css',
})
export class BsNavbarComponent {
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((x) => console.log(x));
  }

  logout() {
    this.afAuth.signOut();
  }
}
