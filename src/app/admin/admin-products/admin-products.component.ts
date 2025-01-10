import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'title', 'price', 'actions'];
  dataSource!: MatTableDataSource<any>;
  subscription: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.dataSource = new MatTableDataSource(products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {}

  filter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    // Set up paginator after view is initialized
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
