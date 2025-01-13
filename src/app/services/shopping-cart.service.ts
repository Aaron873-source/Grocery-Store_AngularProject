import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private dbReady = false;

  constructor(private db: AngularFireDatabase) {
    // Check if Firebase is ready
    this.db.database.ref('.info/connected').on('value', (snap) => {
      this.dbReady = snap.val();
    });
  }

  private async waitForDb(): Promise<void> {
    if (this.dbReady) return;

    return new Promise((resolve) => {
      const callback = (snap: any) => {
        if (snap.val()) {
          this.db.database.ref('.info/connected').off('value', callback);
          resolve();
        }
      };
      this.db.database.ref('.info/connected').on('value', callback);
    });
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<Observable<ShoppingCart | null>> {
    let cartId = await this.getOrCreateCartId();
    if (!cartId) return new Observable((subscriber) => subscriber.next(null));

    return this.db
      .object<any>(`/shopping-carts/${cartId}`)
      .valueChanges()
      .pipe(
        map((cart) => {
          if (!cart) return null;
          return new ShoppingCart(cart.items || {});
        })
      );
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
    await this.waitForDb();
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    if (!cartId) return;
    const item$ = this.getItem(cartId, product.$key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item) {
          let quantity = (item.quantity || 0) + change;
          if (quantity === 0) {
            item$.remove();
          } else {
            item$.update({ quantity: quantity });
          }
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

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    if (!cartId) return;
    this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }
}
