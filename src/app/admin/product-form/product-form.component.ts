import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  categories$: Observable<any[]>;

  constructor(
    private router : Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();
  }

  save(product: Product) {
    this.productService.create(product);
    //After saving the product, redirecting user to the products page
    this.router.navigate(['/admin/products']);
  }
}
