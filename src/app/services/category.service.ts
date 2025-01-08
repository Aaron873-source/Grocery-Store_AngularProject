import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories(): Observable<any[]> {
    return this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            $key: c.payload.key,
            ...(c.payload.val() as object),
          }))
        )
      );
  }
}
