import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() options: any[] = [];
  @Input() label: string = 'Choose';
  @Input() defaultValue: string | null = null;
  @Output() selectedChanged = new EventEmitter();

  isSelected: boolean = false;
  selectedValue: string | null = null;

  constructor() {}

  toggleClick(): void {
    this.isSelected = !this.isSelected;
  }

  onChooseValue(target: HTMLLIElement) {
    this.selectedValue = target.textContent?.trim() || '';
    this.selectedChanged.emit(this.selectedValue);
    this.isSelected = false;
  }
}
