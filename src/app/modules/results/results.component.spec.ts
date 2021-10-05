import { ViewportScroller, DatePipe } from '@angular/common';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { users, tests } from 'src/app/constants/dummyData';
import { routes } from 'src/app/constants/route-test-config';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing';
import { AuthService } from '../auth/auth.service';
import { ResultsComponent } from './results.component';
import { ResultsService } from './results.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

let allUsers: User[] = users;

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  let MockAuthService = jasmine.createSpyObj('AuthService', ['getUser']);
  let resultServiceSpy = jasmine.createSpyObj('ResultsService', [
    'fetchAllTests',
  ]);

  beforeEach(
    waitForAsync(() => {
      MockAuthService.getUser.and.returnValue(allUsers[0]);
      resultServiceSpy.fetchAllTests.and.returnValue(of([]));

      TestBed.configureTestingModule({
        declarations: [ResultsComponent],
        providers: [
          {
            provide: AuthService,
            useValue: MockAuthService,
          },
          {
            provide: ResultsService,
            useValue: resultServiceSpy,
          },
          { provide: ComponentFixtureAutoDetect, useValue: true },
          { provide: ActivatedRoute, useValue: activatedRoute },
          DatePipe,
          ViewportScroller,
        ],
        imports: [
          BrowserAnimationsModule,
          RouterTestingModule.withRoutes(routes),
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should method updateResults not called if tests empty', () => {
    resultServiceSpy.fetchAllTests.and.returnValue(of([]));
    spyOn(component, 'updateResults');
    component.ngOnInit();
    expect(component.updateResults).not.toHaveBeenCalled();
  });

  it('should method updateResults called if tests not empty', () => {
    resultServiceSpy.fetchAllTests.and.returnValue(of(tests));
    spyOn(component, 'updateResults');
    component.ngOnInit();
    expect(component.updateResults).toHaveBeenCalled();
  });

  it('should title = Current Health Status when called getCardMain, where title = Health', () => {
    resultServiceSpy.fetchAllTests.and.returnValue(of(tests));
    component.title = 'Health';

    component.ngOnInit();

    const result = component.getCardMain('overallHealth', true);
    expect(result.title).toBe('Current Health Status');
  });
});
