import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.scss'],
})
export class StatusCardComponent implements OnChanges {
  @Input() result: any;
  @Input() secondary: boolean = false;

  noChange!: boolean;
  increase!: boolean;
  decrease!: boolean;

  deffer!: number;

  constructor() {}

  ngOnChanges() {
    if (!!!this.result) return;
    this.noChange = false;
    this.increase = false;
    this.decrease = false;
    this.handleChanges();
  }

  handleChanges() {
    if (this.result.percent > this.result.lastAverage) {
      this.deffer = this.result.percent - this.result.lastAverage;
      this.increase = true;
    }
    if (this.result.percent < this.result.lastAverage) {
      this.deffer = this.result.lastAverage - this.result.percent;

      this.decrease = true;
    }
    if (this.result.percent == this.result.lastAverage) {
      this.noChange = true;
    }
  }

  getOuterColor(percent: number): string {
    if (percent >= 80) {
      return '#78C000';
    } else if (percent >= 65) {
      return '#D4BB2D';
    } else {
      return '#D96A6A';
    }
  }
}
