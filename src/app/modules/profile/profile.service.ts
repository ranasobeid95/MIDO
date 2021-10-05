import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private userCollection!: AngularFirestoreCollection<User>;

  constructor(
    private authService: AuthService,
    private afstore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  getUserData(): Observable<User> {
    const userId = this.authService.getUser()?.uid;
    this.userCollection = this.afstore.collection<User>('users');
    return this.userCollection
      .doc(userId)
      .valueChanges()
      .pipe(
        map((res: any) => {
          let dateOfBirth;
          if (res.dateOfBirth && typeof res.dateOfBirth === 'object') {
            dateOfBirth = res.dateOfBirth ? res.dateOfBirth.toDate() : null;
          } else if (typeof res.dateOfBirth === 'string') {
            dateOfBirth = new Date(res.dateOfBirth);
          } else {
            dateOfBirth = null;
          }
          return { ...res, dateOfBirth };
        })
      );
  }

  updateUserData(data: User): Promise<any> {
    const userId = this.authService.getUser()?.uid;
    return this.userCollection.doc(userId).update(data);
  }

  changePassword(newPass: string) {
    return this.afAuth.currentUser.then((user) => {
      return user?.updatePassword(newPass);
    });
  }
}
