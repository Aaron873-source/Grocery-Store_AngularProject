import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@firebase/auth-types';
import { Collapse } from 'bootstrap';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
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

  cart$!: Observable<ShoppingCart | null>;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}
  async ngOnInit(): Promise<void> {
    this.authService.appUser$.subscribe((appUser) => (this.appUser = appUser));
    this.authSubscription = this.authService.user$.subscribe((user) => {
      this.user = user;
    });

    // Wait for the cart to be ready before subscribing
    await this.waitForCart();

    // Initialize Bootstrap collapse
    document
      .querySelectorAll('[data-bs-toggle="collapse"]')
      .forEach((button) => {
        new Collapse(button.nextElementSibling as HTMLElement, {
          toggle: false,
        });
      });
  }

  private async waitForCart() {
    this.cart$ = await this.shoppingCartService.getCart();
    // Force initial subscription
    this.cart$.subscribe();
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
