import { LocationStrategy, DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/constants/route-test-config';
import { UploadService } from 'src/app/shared/services/upload.service';

import { NewTestComponent } from './new-test.component';
import { NewTestService } from './new-test.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('NewTestComponent', () => {
  let component: NewTestComponent;
  let fixture: ComponentFixture<NewTestComponent>;
  let newTestServiceSpy;
  let uploadServiceSpy;

  beforeEach(async () => {
    newTestServiceSpy = jasmine.createSpyObj('NewTestService', ['postNewTest']);
    uploadServiceSpy = jasmine.createSpyObj('UploadService', ['uploadImage']);

    await TestBed.configureTestingModule({
      declarations: [NewTestComponent],
      providers: [
        { provide: NewTestService, useValue: newTestServiceSpy },
        { provide: UploadService, useValue: uploadServiceSpy },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        DatePipe,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should answers has empty Object before start', () => {
    let answersLength = Object.keys(component.answers).length;
    expect(answersLength).toBe(0);
  });

  it('should save 12 into waterIntake answers when choose 12 ', () => {
    component.selectAnswer('12', 'glasses');
    expect(component.answers.waterIntake).toBe(12);
  });

  describe('#Integration_Tests: ', () => {
    it('#submit-button should be disabled before update image', () => {
      const btnSubmit = fixture.debugElement.query(By.css('.new-test__submit'));
      expect(btnSubmit.attributes.disabled).toBe('');
    });

    it('#submit-button should be active after update image', () => {
      const btnSubmit = fixture.debugElement.query(By.css('.new-test__submit'));

      // create blob file
      const blobFile = createBlobImage();
      component.onChangeImage(blobFile);

      fixture.detectChanges();

      expect(btnSubmit.attributes.disabled).toBeFalsy();
    });
  });
});

function createBlobImage() {
  var blob = new Blob([''], { type: 'text/html' });
  return blob;
}
