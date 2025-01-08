import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/product';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnDestroy {
  categories$: Observable<any[]>;
  product: Product = {
    title: '',
    price: 0,
    category: '',
    imageUrl: '',
  };
  private subscription?: Subscription;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.subscription = this.productService
        .get(this.id)
        .valueChanges()
        .subscribe((p) => (this.product = p as Product));
  }

  save(product: Product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    //After saving the product, redirecting user to the products page
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      if (this.id) this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
