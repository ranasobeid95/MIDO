import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NewTestModule } from '../new-test.module';

import { QuestionCardRadioComponent } from './question-card-radio.component';

describe('QuestionCardRadioComponent', () => {
  let component: QuestionCardRadioComponent;
  let fixture: ComponentFixture<QuestionCardRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionCardRadioComponent],
      imports: [NewTestModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCardRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`When customRadio is "false" should numbers of #mat-radio-button "equal = radioNumber"`, () => {
    component.radioNumber = 7;

    fixture.detectChanges();

    const numRadio = fixture.debugElement.queryAll(
      By.css('mat-radio-button')
    ).length;

    expect(numRadio).toBe(7, 'radio numbers must to be 7');
  });

  it(`When customRadio is "true" should numbers of #mat-radio-button "equal = radioNumber + 1"`, () => {
    component.radioNumber = 7;
    component.customRadio = true;

    fixture.detectChanges();

    const numRadio = fixture.debugElement.queryAll(
      By.css('mat-radio-button')
    ).length;

    expect(numRadio).toBe(8, 'radio numbers must to be 8');
  });

  it('should answerChosen function has been called when choose answer', () => {
    component.radioNumber = 7;

    spyOn(component.answerChosen, 'emit');

    fixture.detectChanges();

    const radioInput = fixture.debugElement.query(By.css('mat-radio-button'));

    radioInput.nativeElement.dispatchEvent(new Event('click'));

    expect(component.answerChosen.emit).toHaveBeenCalled();
  });

  describe('when handleSelectValue(value) called', () => {
    it(`should result contains "glasses" if unit is "glass" and "value > 1" `, () => {
      component.unit = 'glass';
      const result = component.handleSelectValue(4).split(' ')[1];
      expect(result).toBe('glasses');
    });

    it(`should result contains "days" if unit is "day" and "value > 1" `, () => {
      component.unit = 'day';
      const result = component.handleSelectValue(4);
      expect(result).toContain('days');
    });

    it(`should result contains "day" if unit is "day" and "value <= 1" `, () => {
      component.unit = 'day';
      const result = component.handleSelectValue(1);
      expect(result).toContain('day');
    });

    it(`should result contains "+12" if unit is any and "value = 12" `, () => {
      component.unit = 'day';
      const result = component.handleSelectValue(12);
      expect(result).toContain('+12');
    });
  });
});
