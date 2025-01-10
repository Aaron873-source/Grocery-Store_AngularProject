import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [
  //Adding routes for the Anonymous users below
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },
  //Now Adding routes for the Logged in users below
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'my/orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuardService],
  },
  //Now Adding routes for the Admins below
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
