import { DatePipe } from '@angular/common';
import { OnChanges, SimpleChanges } from '@angular/core';
import { HostListener } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { helpers } from 'chart.js';

import { Color, Label } from 'ng2-charts';
import { Chart_Result } from 'src/app/models/result';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements OnInit, OnChanges {
  @Input() dataset!: ChartDataSets[];
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

  public barChartColors!: Color[];

  constructor(public datePipe: DatePipe) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.chartLabels = this.labels;
    const dataSetWithOption = this.handleDataWithOption(this.dataset);
    this.chartDataset = [...dataSetWithOption];
    this.barChartColors = [{ backgroundColor: '#b3e7fb80' }];
    this.setChartOptions();
  }

  handleDataWithOption(datasets: any[]): ChartDataSets[] {
    return datasets.map((el) => {
      return { ...el } as ChartDataSets;
    });
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
