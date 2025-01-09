import { Component, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  categories$;

  @Input('category') category: string | null = null; //category is the name of the input in the html

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }
}
