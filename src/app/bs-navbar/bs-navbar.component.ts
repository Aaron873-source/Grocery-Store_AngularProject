import { Component, OnDestroy } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css',
})
export class BsNavbarComponent implements OnDestroy {
  user: User | null = null;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
    // Change to AuthService
    this.authSubscription = this.authService.user$.subscribe((user) => {
      // Change to user$ observable
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
    this.authService.logout();
  }
}
