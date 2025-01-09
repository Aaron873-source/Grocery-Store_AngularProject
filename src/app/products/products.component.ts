import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    productService
      .getAll()
      .valueChanges()
      .subscribe((products) => {
        this.products = products as Product[];
        //Below handling the query params , done to happen after the products are loaded from the service
        this.route.queryParamMap.subscribe((params) => {
          this.category = params.get('category');
          //Setting the filtered products array
          this.filteredProducts = this.category
            ? this.products.filter((p) => p.category === this.category)
            : this.products;
        });
      });
    this.categories$ = categoryService.getAll();

  
  }
}

