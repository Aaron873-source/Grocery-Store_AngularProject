import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit , OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: any;
  category: string | null = null;
  subscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {



    productService
      .getAll()
      .subscribe((products) => {
        this.products = products;
        //Below handling the query params , done to happen after the products are loaded from the service
        this.route.queryParamMap.subscribe((params) => {
          this.category = params.get('category');
          //Setting the filtered products array
          this.filteredProducts = this.category
            ? this.products.filter((p) => p.category === this.category)
            : this.products;
        });
      });
    

  
  }



 async ngOnInit() {
  this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe((cart) => {
    this.cart = cart;
  });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

