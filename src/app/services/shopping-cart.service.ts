import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}`);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId(): Promise<string | null> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      if (result.key) {
        localStorage.setItem('cartId', result.key);
        return result.key;
      }
      return null;
    }
    // Don't forget to return the existing cart if cartId exists
    return cartId;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    if (!cartId) return;
    const item$ = this.getItem(cartId, product.$key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) {
          item$.update({ quantity: (item.quantity || 0) + 1 });
        } else {
          item$.set({
            category: product.category,
            imageUrl: product.imageUrl,
            price: product.price,
            title: product.title,
            quantity: 1,
          });
        }
      });
  }
}
