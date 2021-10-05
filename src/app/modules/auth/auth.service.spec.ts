import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/constants/route-test-config';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { UiService } from 'src/app/shared/services/ui.service';
import { FireAuthMock, FirestoreMock } from 'src/app/testing';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  // signup data expected success,
  // use this data and down spread obj and change any variable
  let mockData = {
    firstName: 'asem',
    lastName: 'hasan',
    email: 'asem123@gmail.com',
    password: '12345678rA',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: FireAuthMock },
        { provide: AngularFirestore, useClass: FirestoreMock },
        UiService,
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        MaterialModule,
      ],
    });
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
  });

  describe('::Signup', () => {
    describe('when the email is already registered', () => {
      it(`should message error is: "auth/email-already-exists" `, async () => {
        let mockDataEmailErr = { ...mockData };
        try {
          await authService.signup(mockDataEmailErr);
        } catch (err: any) {
          expect(err.errorMsg).toBe('auth/email-already-exists');
          expect(err.success).toBe(false);
        }
      });
    });

    describe(`when the email is not registered`, () => {
      it(`should response.success is: "true" `, async () => {
        const mockSuccess = { ...mockData, email: 'new-user@email.com' };
        const res = await authService.signup(mockSuccess);
        expect(res.success).toBeTrue();
      });
    });
  });

  /*--------------------------------------- SignIn Test ----------------------------------*/

  describe('::SignIn', () => {
    describe('when the user does not exist', () => {
      it(`should message error contain: "no user record" `, async () => {
        let mockDataEmailErr = { ...mockData, email: 'test@email.com' };
        try {
          await authService.signIn(mockDataEmailErr);
        } catch (err: any) {
          expect(err.message).toContain('no user record');
        }
      });
    });

    describe(`when the user is exist`, () => {
      describe('and password is correct', () => {
        it(`should response have same email that enter  `, async () => {
          const mockSuccess = { ...mockData };
          const { user } = await authService.signIn(mockSuccess);
          expect(user?.email).toBe(mockSuccess.email);
        });
      });

      describe('and password is incorrect', () => {
        it(`should response.message is: "PassWord is Not Correct" `, async () => {
          const mockDataPassErr = { ...mockData, password: '2234223' };
          try {
            await authService.signIn(mockDataPassErr);
          } catch (err: any) {
            expect(err.message).toContain('Password is not correct');
          }
        });
      });
    });
  });
});
