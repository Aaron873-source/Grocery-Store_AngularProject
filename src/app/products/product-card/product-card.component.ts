import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  async addToCart() {
    await this.cartService.addToCart(this.product);
    // Force a cart update through the service
    const cartObservable = await this.cartService.getCart();
    cartObservable.subscribe((cart) => {
      if (cart) {
        this.shoppingCart = cart;
      }
    });
  }
}
