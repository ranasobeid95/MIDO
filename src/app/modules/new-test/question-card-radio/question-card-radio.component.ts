import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-card-radio',
  templateUrl: './question-card-radio.component.html',
  styleUrls: ['./question-card-radio.component.scss'],
})
export class QuestionCardRadioComponent implements OnInit {
  @Input() question: string = '';
  @Input() set radioNumber(num: number) {
    this.radioArr = Array(num)
      .fill(0)
      .map((x, i) => i);
  }
  @Input() customRadio: boolean = false;
  @Input() hint: string | null = null;
  @Input() unit: string = '';
  @Output() answerChosen = new EventEmitter<string>();
  selectedValue: string | null = null;

  radioArr!: any[];

  constructor() {}

  ngOnInit(): void {}

  chooseAnswer(value: string) {
    this.answerChosen.emit(value);
    this.selectedValue = this.handleSelectValue(Number(value));
  }

  handleSelectValue(value: number): string {
    let endingS = this.unit === 'glass' ? 'es' : 's';
    let result = '';
    if (value <= 1) {
      result = `${value} ${this.unit}`;
    } else if (value === 12) {
      result = `+12 ${this.unit}`;
    } else {
      result = `${value} ${this.unit + endingS}`;
    }

    return result;
  }
}
