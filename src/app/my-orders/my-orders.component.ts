import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';



@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent {
  orders$: Observable<Order[]>;
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.orders$ = authService.user$.pipe(
      switchMap(
        (u) =>
          orderService.getOrdersByUser(u!.uid).valueChanges() as Observable<
            Order[]
          >
      )
    );
  }
}
