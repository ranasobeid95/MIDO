import { DatePipe } from '@angular/common';
import { OnChanges } from '@angular/core';
import { HostListener } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Chart_Result } from 'src/app/models/result';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.scss'],
})
export class ChartLineComponent implements OnInit, OnChanges {
  @Input() dataset!: any[];
  @Input() labels: any;

  chartLabels: Label[] = [];
  chartDataset!: ChartDataSets[];
  chartOptions!: ChartOptions;

  paraStructure!: Chart_Result;

  scaleLabelFontSize!: number;

  ticksFontSize!: number;

  scoresDataMain!: any;
  scoresDataSecondary!: any;
  barThicknessNum!: number;

  scale!: any;

  constructor(public datePipe: DatePipe) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.chartLabels = this.labels;
    this.chartDataset = [...this.dataset];

    this.setChartOptions();
  }

  setChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              fontFamily: `"Poppins", sans-serif`,
              fontSize: this.scaleLabelFontSize,
              labelString: 'Current Health Status',
            },
            ticks: {
              max: 100,
              min: 0,
              fontColor: 'white',
              fontSize: this.ticksFontSize,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: 'white',
              fontSize: this.ticksFontSize,
            },
            gridLines: {
              color: '#20242400',
            },
            scaleLabel: {
              fontFamily: `"Poppins", sans-serif`,
              fontSize: this.scaleLabelFontSize,
              labelString: 'Testing Date  📅',
            },
          },
        ],
      },
      legend: {
        labels: {
          fontColor: 'white',
        },
      },
    };
  }
}
