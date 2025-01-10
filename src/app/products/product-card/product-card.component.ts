import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: any = {};
  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Product) {
    //first we get the cart id from the local storage
    this.cartService.addToCart(product);
  }


  getQuantity() {
    if (!this.shoppingCart) return 0;
    const item = this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }


}
