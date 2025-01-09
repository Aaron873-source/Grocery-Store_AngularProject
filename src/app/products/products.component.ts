import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products$;
  categories$;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.products$ = productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            $key: c.payload.key,
            ...(c.payload.val() as Product),
          }))
        )
      );
    this.categories$ = categoryService.getAll();
  }
}
