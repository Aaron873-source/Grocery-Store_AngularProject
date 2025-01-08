import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  categories$: Observable<any[]>;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
  }
}
