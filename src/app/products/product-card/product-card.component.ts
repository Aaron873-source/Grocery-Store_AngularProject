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
  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Product) {
    //first we get the cart id from the local storage
    this.cartService.addToCart(product);

   
  }
}
