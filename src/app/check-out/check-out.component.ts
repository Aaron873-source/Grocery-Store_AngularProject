import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shipping } from '../models/shipping';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
  };
  cart!: ShoppingCart;
  cartSubscription!: Subscription;
  constructor(
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService
  ) {}
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => {
      if (cart) this.cart = cart;
    });
  }

  placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map((i) => ({
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      })),
    };
    this.orderService.storeOrder(order);
  }
}
