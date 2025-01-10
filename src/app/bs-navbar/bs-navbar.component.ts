import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Subscription } from 'rxjs';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css',
})
export class BsNavbarComponent implements OnDestroy, OnInit {
  user: User | null = null;
  private authSubscription!: Subscription;
  appUser: AppUser | null = null;

  shoppingCartItemCount: number = 0;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}
  async ngOnInit(): Promise<void> {
    this.authService.appUser$.subscribe((appUser) => (this.appUser = appUser));
    // Change to AuthService
    this.authSubscription = this.authService.user$.subscribe((user) => {
      // Change to user$ observable
      this.user = user;
      console.log('Auth State Changed:', user);
    });

    //
    let cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe((cart) => {
      if (cart && cart.items) {
        this.shoppingCartItemCount = 0;
        for (let productId in cart.items) {
          this.shoppingCartItemCount += cart.items[productId].quantity;
        }
      }
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
