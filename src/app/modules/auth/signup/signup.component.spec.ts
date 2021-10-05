import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SignupComponent } from './signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

let component: SignupComponent;
let fixture: ComponentFixture<SignupComponent>;
let mockAuthservice;

describe('SignupComponent', () => {
  beforeEach(async () => {
    mockAuthservice = jasmine.createSpyObj(['signout']);

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, SharedModule],
      declarations: [SignupComponent],
      providers: [
        FormBuilder,
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: AuthService, useValue: mockAuthservice },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
  });

  it('Form invalid when empty', () => {
    expect(component.signupForm.valid).toBeFalse();
  });

  it('Email field validity', () => {
    let email = component.signupForm.controls['email'];

    email.setValue('test');
    expect(email.valid).toBeFalse();

    email.setValue('test@email.com');
    expect(email.valid).toBeTrue();
  });

  it('password field validity', () => {
    let password = component.signupForm.controls['password'];

    // if password is weak
    password.setValue('asem');
    expect(password.errors!['passwordWeak']).toBeTruthy;

    // if password is strong
    password.setValue('Pass123');
    expect(password.valid).toBeTrue();
  });

  it('ConfirmPassword field validity', () => {
    let password = component.signupForm.controls['password'];
    let confirmPassword = component.signupForm.controls['confirmPassword'];

    // when two password are not match
    password.setValue('Pass123');
    confirmPassword.setValue('Pass12');
    expect(confirmPassword.valid).toBeFalsy();

    // when two password are match
    password.setValue('Pass123');
    confirmPassword.setValue('Pass123');
    expect(confirmPassword.valid).toBeTruthy();
  });

  it('Should submit button to be active when signupForm is valid', () => {
    let firstName = component.signupForm.controls['firstName'];
    let lastName = component.signupForm.controls['lastName'];
    let email = component.signupForm.controls['email'];
    let password = component.signupForm.controls['password'];
    let confirmPassword = component.signupForm.controls['confirmPassword'];

    const button = fixture.debugElement.query(By.css('[type=submit]'));

    // button disable is truthy
    let isDisable = button.nativeElement.getAttribute('disabled');
    expect(isDisable).toBeTruthy();

    // button disable is falsy
    firstName.setValue('asem');
    lastName.setValue('hasan');
    email.setValue('asem@email.com');
    password.setValue('Pass1234');
    confirmPassword.setValue('Pass1234');

    fixture.detectChanges();

    let isDisable1 = button.nativeElement.getAttribute('disabled');
    expect(isDisable1).toBeFalsy();
  });

  describe('#Integration_Tests ', () => {
    it('should render error correctly in mat-error element ', () => {
      let error = 'these is something wrong';
      component.error = error;

      fixture.detectChanges();

      const matError = fixture.debugElement.query(By.css('mat-error'));

      expect(matError.nativeElement.textContent).toContain(error);
    });

    it('should update all fields signup form after set values By signupForm builder', () => {
      const inputData = [
        { name: 'firstName', value: 'asem' },
        { name: 'lastName', value: 'hasan' },
        { name: 'email', value: 'asem@email.com' },
        { name: 'password', value: 'Pass123' },
        { name: 'confirmPassword', value: 'Pass123' },
      ];

      inputData.forEach(({ name, value }) => {
        const input = queryByCss(`[formControlName=${name}]`);

        component.signupForm.controls[name].setValue(value);

        fixture.detectChanges();

        expect(input.nativeElement.value).toBe(
          value,
          `value must to Be ${value}`
        );
      });
    });
  });
});

function queryByCss(selector: string) {
  const debugElement = fixture.debugElement.query(By.css(selector));
  // Fail on null so the return type is always DebugElement.
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}
