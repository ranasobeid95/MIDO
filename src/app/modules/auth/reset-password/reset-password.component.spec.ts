import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { users } from 'src/app/constants/dummyData';
import { routes } from 'src/app/constants/route-test-config';
import { User } from 'src/app/models/user';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { ResetPasswordComponent } from './reset-password.component';

let allUsers: User[] = users;

describe('Reset Password Testing', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let resetPasswordDe: DebugElement;
  let resetPassword: HTMLElement;
  let resetPasswordSpy: jasmine.Spy;

  let MockAuthService = jasmine.createSpyObj('AuthService', ['resetPassword']);

  function emulateResetPasswordMethod(email: string) {
    resetPasswordSpy = MockAuthService.resetPassword.and.returnValue(
      new Promise<void>((resolve, reject) => {
        let user = allUsers.find((ele) => ele.email === email);
        if (user) {
          resolve();
        } else {
          reject(new Error('no user record'));
        }
      })
    );
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResetPasswordComponent],
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
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    resetPasswordDe = fixture.debugElement;
    resetPassword = resetPasswordDe.nativeElement;
    fixture.detectChanges();
  });

  it('Reset password component should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form Validation', () => {
    //Form is empty
    expect(component.resetPasswordForm.valid).toBeFalsy();
    const SendLinkBtn = resetPassword.querySelector('.basic-style-btn');

    expect(SendLinkBtn!.getAttribute('disabled')).toBeTruthy();
    expect(component.linkSended).toBeFalsy();
  });

  it('Enter an unregistered email', async () => {
    component.resetPasswordForm.controls['email'].setValue('test@test.com');
    const SendLinkBtn = resetPassword.querySelector('.basic-style-btn');

    fixture.detectChanges();

    expect(SendLinkBtn!.getAttribute('disabled')).toBeFalsy();
    emulateResetPasswordMethod(component.resetPasswordForm.value.email!);

    await component.submit();

    expect(component.linkSended).toBeFalsy();
  });

  it('Enter an Registered email', async () => {
    component.resetPasswordForm.controls['email'].setValue(allUsers[0].email);

    emulateResetPasswordMethod(component.resetPasswordForm.value.email!);

    await component.submit();

    expect(component.linkSended).toBeTruthy();
  });
});
