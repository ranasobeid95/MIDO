import { Injectable } from '@angular/core';
import { users } from '../constants/dummyData';
import { User } from '../models/user';

@Injectable()
export class FireAuthMock {
  mockUser: User[] = users;

  constructor() {}

  async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    let auth = this.checkValidData({ email, password });

    if (auth.email) {
      throw new Error('auth/email-already-exists');
    }

    // create new user and return his data
    return Promise.resolve({ user: { email } });
  }

  private checkValidData(data: any) {
    let auth: any = { email: null, password: null };
    this.mockUser.map((el) => {
      if (el.email === data.email) {
        auth.email = el.email;
        if (el.password === data.password) {
          auth.password = true;
        }
      }
    });
    return auth;
  }

  currentUser: Promise<any> = new Promise((resolve, reject) => (test: any) => {
    test.sendEmailVerification();
  });

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    let checkUser = this.checkValidData({ email, password });

    if (!checkUser.email) {
      return Promise.reject(new Error('no user record'));
    }
    if (!checkUser.password) {
      return Promise.reject(new Error('Password is not correct'));
    }

    return Promise.resolve({ user: { email } });
  }
}
