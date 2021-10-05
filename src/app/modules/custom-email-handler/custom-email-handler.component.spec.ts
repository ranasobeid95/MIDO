import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing';
import { AuthService } from '../auth/auth.service';

import { CustomEmailHandlerComponent } from './custom-email-handler.component';

describe('CustomEmailHandlerComponent', () => {
  let component: CustomEmailHandlerComponent;
  let fixture: ComponentFixture<CustomEmailHandlerComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  let AuthServiceSpy = jasmine.createSpyObj('AuthService', [
    'handleVerifyEmail',
  ]);

  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(
    waitForAsync(() => {
      // these two spy functions for testing are called, No need to do more {any return}
      AuthServiceSpy.handleVerifyEmail.and.returnValue(() => {
        actionCode: 'abc';
      });

      routerSpy.navigate.and.returnValue(() => ({ any: 1 }));

      TestBed.configureTestingModule({
        declarations: [CustomEmailHandlerComponent],
        providers: [
          { provide: Router, useValue: routerSpy },
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: AuthService, useValue: AuthServiceSpy },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomEmailHandlerComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when mode = resetPassword', () => {
    activatedRoute.setParamMap({
      mode: 'resetPassword',
      actionCode: 'action-code',
    });

    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should handleVerifyEmail called when mode = verifyEmail', () => {
    activatedRoute.setParamMap({
      mode: 'verifyEmail',
      actionCode: 'action-code',
    });

    fixture.detectChanges();
    expect(AuthServiceSpy.handleVerifyEmail).toHaveBeenCalled();
  });
});
