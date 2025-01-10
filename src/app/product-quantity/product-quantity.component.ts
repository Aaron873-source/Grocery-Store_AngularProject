import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrl: './product-quantity.component.css'
})
export class ProductQuantityComponent {

  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart: any = {};
  constructor(private cartService: ShoppingCartService) {}
  
  addToCart() {
    //first we get the cart id from the local storage
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }


}





