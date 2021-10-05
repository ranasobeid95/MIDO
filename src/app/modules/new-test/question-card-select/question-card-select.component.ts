import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-card-select',
  templateUrl: './question-card-select.component.html',
  styleUrls: ['./question-card-select.component.scss'],
})
export class QuestionCardSelectComponent implements OnInit {
  dietTypes: any = [
    { id: 1, value: 'Nothing', text: 'Nothing to report' },
    { id: 2, value: 'restricting calories', text: `I'm restricting calories` },
    {
      id: 3,
      value: 'limiting added sugars',
      text: `I'm limiting added sugars`,
    },
    {
      id: 4,
      value: 'restricting carbohydrates',
      text: `I'm restricting carbohydrates`,
    },
    {
      id: 5,
      value: 'trying a vegetarian diet',
      text: `I'm trying a vegetarian diet`,
    },
    { id: 6, value: 'trying a vegan diet', text: `I'm trying a vegan diet` },
    {
      id: 6,
      value: 'trying a an alkaline diet',
      text: `I'm trying a an alkaline diet`,
    },
    { id: 6, value: 'other', text: `Other` },
  ];

  isSelected: boolean = false;
  selectedDiet: string | null = null;
  @Output() dietChosen = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  toggleClick(): void {
    this.isSelected = !this.isSelected;
  }

  onChooseValue(target: HTMLLIElement) {
    // for sending value
    let value = target.dataset.value && target.dataset.value.trim();
    this.selectedDiet = target.textContent;
    this.isSelected = !this.isSelected;
    this.dietChosen.emit(value);
  }
}
