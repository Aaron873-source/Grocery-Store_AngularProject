import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: User) {
    return this.db.object(`/users/${user.uid}`).update({
      name: user.displayName,
      email: user.email,
    })
    .then(() => console.log('User saved successfully'))
    .catch(error => console.error('Error saving user:', error));
    ;
  }
}
