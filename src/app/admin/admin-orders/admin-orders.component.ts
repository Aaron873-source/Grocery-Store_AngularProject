import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
})
export class AdminOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders().valueChanges() as Observable<
      Order[]
    >;
  }
}
