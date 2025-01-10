import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  category: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
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
}

