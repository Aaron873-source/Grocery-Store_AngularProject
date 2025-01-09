import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products$;

  constructor(private productService: ProductService) {
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
  }
}
