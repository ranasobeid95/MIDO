import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { SignInComponent } from './sign-in.component';
import { routes } from 'src/app/constants/route-test-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { User } from 'src/app/models/user';
import { users } from 'src/app/constants/dummyData';
import { DebugElement } from '@angular/core';

let allUsers: User[] = users;

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let signInSpy: jasmine.Spy;

  let MockAuthService = jasmine.createSpyObj('AuthService', ['signIn']);

  function emulateSignInMethod(values: User) {
    signInSpy = MockAuthService.signIn.and.returnValue(
      new Promise((resolve, reject) => {
        let { email, password } = values;
        let user = allUsers.find((ele) => ele.email === email);
        if (user) {
          if (user.password === password) {
            resolve('user logged in');
          } else {
            reject(new Error('Password incorrect'));
          }
        } else {
          reject(new Error('no user record'));
        }
      })
    );
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SignInComponent],
        providers: [
          {
            provide: AuthService,
            useValue: MockAuthService,
          },
          { provide: ComponentFixtureAutoDetect, useValue: true },
          FormBuilder,
        ],
        imports: [
          BrowserAnimationsModule,
          AuthModule,
          RouterTestingModule.withRoutes(routes),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form it invalid when it was empty', () => {
    expect(component.signInForm.valid).toBeFalsy();
  });

  it('SignIn button is disabled when form was invalid', () => {
    expect(component.signInForm.valid).toBeFalsy();

    const signInDe: DebugElement = fixture.debugElement;
    const signIn: HTMLElement = signInDe.nativeElement;
    const signInBtn = signIn.querySelector('.basic-style-btn');

    expect(signInBtn!.getAttribute('disabled')).toBeTruthy();
  });

  it('Email field validation', () => {
    let email = component.signInForm.controls['email'];

    //email field is empty
    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};

    expect(errors['required']).toBeTruthy();
    //Enter invalid email
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();

    //Enter valid email
    email.setValue('test@test.test');
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

  it('Password field validation', () => {
    let password = component.signInForm.controls['password'];
    expect(password.valid).toBeFalsy();

    //password field is empty

    let errors = password.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('Enter incorrect password', async () => {
    component.signInForm.controls['email'].setValue(users[0].email);
    component.signInForm.controls['password'].setValue('1234598Ar');
    expect(component.signInForm.valid).toBeTruthy();

    emulateSignInMethod(component.signInForm.value);
    await component.submit();

    expect(component.invalidPassword).toBeTruthy();
  });

  it('Enter an unregistered email', async () => {
    fixture.detectChanges();

    component.signInForm.controls['email'].setValue('test@test.com');
    component.signInForm.controls['password'].setValue('1234598Ar');
    expect(component.signInForm.valid).toBeTruthy();

    emulateSignInMethod(component.signInForm.value);
    await component.submit();
    expect(component.isNotExist).toBeTruthy();
  });

  it('User is logged in', async () => {
    component.signInForm.controls['email'].setValue(users[0].email);
    component.signInForm.controls['password'].setValue(users[0].password);
    expect(component.signInForm.valid).toBeTruthy();

    emulateSignInMethod(component.signInForm.value);
    await component.submit();

    expect(component.invalidPassword).toBeFalsy();
    expect(component.isNotExist).toBeFalsy();
  });
});
