import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { MaterialModule } from '../../material/material.module';
import { SideNavComponent } from './side-nav.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let mockAuthService;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['signout']);

    await TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: AuthService, useValue: mockAuthService },
      ],
      imports: [MaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;

    // to hide component in karma which its hide specs reporter
    fixture.debugElement.nativeElement.style.visibility = 'hidden';
  });

  it('Should showNested equal true when toggleNested called ', () => {
    component.toggleNested();
    expect(component.showNested).toBe(true);
  });

  it('Should closeSideNav emit when click on close button', () => {
    spyOn(component.closeSideNav, 'emit');
    const button = fixture.debugElement.query(By.css('.close-btn'));
    button.nativeElement.dispatchEvent(new Event('click'));

    expect(component.closeSideNav.emit).toHaveBeenCalled();
  });
});
