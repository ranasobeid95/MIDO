import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from 'src/app/models/user';
import { ROUTES } from 'src/app/constants/routes';
import { UserException } from 'src/app/models/error';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { UiService } from 'src/app/shared/services/ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private user: User | null = null;
  private userChange = new Subject<User | null>();
  private loggedIn = new BehaviorSubject<boolean>(false);
  ROUTES = ROUTES;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public afAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    private uiService: UiService
  ) {}

  initAuthListener() {
    this.afAuth.authState
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user) => {
        if (user) {
          this.setUserInfo(user);
          this.loggedIn.next(true);
        } else {
          this.loggedIn.next(false);
          this.userChange.next(null);
          this.user = null;
        }
      });
  }

  isAuth$(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => {
        return !!user;
      }),
      catchError(() => of(false))
    );
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private setUserInfo(user: any) {
    const currUser: User = {
      uid: user.uid,
      firstName: user.displayName?.split(' ')[0],
      lastName: user.displayName?.split(' ')[1],
      email: user.email!,
      profilePhoto: user.photoURL!,
      emailVerified: user.emailVerified,
    };
    this.userChange.next(currUser);
    this.user = currUser;
  }

  getUser() {
    return this.user;
  }

  getUserChange() {
    return this.userChange.asObservable();
  }

  // Sign in with email/password

  signIn(user: User) {
    const { email, password } = user;

    return this.afAuth
      .signInWithEmailAndPassword(email, password!)
      .then((userCredential) => {
        return userCredential;
      })
      .catch((error) => {
        throw Error(error.message);
      });
  }
  // Sign up with email/password
  signup(data: User) {
    return this.afAuth
      .createUserWithEmailAndPassword(data.email, data.password!)
      .then(({ user }) => {
        this.SendVerificationMail();
        let displayName = `${data.firstName} ${data.lastName}`;

        this.updateUserAuth({
          displayName,
        });

        const userData = {
          uid: user!.uid,
          emailVerified: user!.emailVerified,
          firstName: data.firstName,
          lastName: data.lastName,
          createdAt: new Date(),
        };

        this.createUserProfile(userData);
        this.router.navigate([this.ROUTES.HOME_PAGE]);
        return new UserException(true, '');
      })
      .catch((err) => {
        throw new UserException(false, err.message);
      });
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then((user) => {
      user?.sendEmailVerification();
    });
  }

  // Reset Forgot password

  resetPassword(email: string) {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        return `We've sent you a password reset link`;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  // confirmPasswordReset
  confirmPasswordReset(code: string, newPassword: string) {
    return this.afAuth
      .confirmPasswordReset(code, newPassword)
      .then(() => {
        this.router.navigate([`/${ROUTES.SIGN_IN}`]);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  // Returns true when user is logged in and email is verified

  // Setting up user data in Firestore database using AngularFirestore + AngularFirestoreDocument service
  createUserProfile(userData: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${userData.uid}`
    );

    return userRef.set(userData);
  }

  updateUserAuth(data: any) {
    const user = this.afAuth.currentUser;
    return user.then(async (user) => {
      await user?.updateProfile(data);
      this.setUserInfo(user);
    });
  }

  updateUserInFirestore(userId: any, data: any) {
    const userRef: AngularFirestoreDocument<any> = this.afStore
      .collection('users')
      .doc(userId);

    return userRef.update(data);
  }

  handleVerifyEmail(actionCode: string) {
    this.router.navigate([ROUTES.HOME_PAGE]);
    setTimeout(() => {
      this.uiService.showVerifyChanged.next(false);
    }, 0);
    this.afAuth
      .applyActionCode(actionCode)
      .then(() => {
        if (this.getUser()?.uid) {
          this.updateUserInFirestore(this.getUser()?.uid, {
            emailVerified: true,
          });
        }
      })
      .catch((err) => {
        this.router.navigate([ROUTES.HOME_PAGE]);
      });
  }

  // Sign out
  signout() {
    this.afAuth.signOut().then(() => {
      this.loggedIn.next(false);
      this.userChange.next(null);
      this.user = null;

      this.router.navigate([ROUTES.HOME_PAGE]);
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
