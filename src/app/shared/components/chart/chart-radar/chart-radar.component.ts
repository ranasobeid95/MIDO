import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Chart_Radar_Result } from 'src/app/models/chart-radar';

@Component({
  selector: 'app-chart-radar',
  templateUrl: './chart-radar.component.html',
  styleUrls: ['./chart-radar.component.scss'],
})
export class ChartRadarComponent implements OnInit {
  @Input() resultsData!: Chart_Radar_Result;

  chartLabels!: Label[];
  chartDataset!: ChartDataSets[];
  chartOptions!: RadialChartOptions;

  constructor() {}

  ngOnInit(): void {
    this.chartLabels = this.resultsData.labels!.map((el) => {
      return el.slice(0, 1).toUpperCase() + el.slice(1);
    });
    this.chartDataset = [
      { data: this.resultsData.data, ...this.getChartDatasetOption() },
    ];
    this.setChartOptions();
  }

  getChartDatasetOption(): ChartDataSets {
    return {
      backgroundColor: '#b3e7fb80',

      borderColor: '#3bb3af',

      pointBorderWidth: 8,
      pointHoverBorderWidth: 12,

      pointBorderColor: '#3bb3af',
      pointHoverBorderColor: '#3bb3af',
    };
  }

  setChartOptions() {
    this.chartOptions = {
      legend: {
        display: false,
      },
      scale: {
        ticks: {
          beginAtZero: true,
          min: 50,
          max: 100,
          stepSize: 10,
          display: false,
        },
        gridLines: { circular: true, lineWidth: 1, color: '#267b7f' },
        pointLabels: { fontSize: 13, fontColor: '#202424' },
      },
      tooltips: {
        axis: 'x',
        callbacks: {
          title: () => '',
          label: (item, data) => {
            let text = data.labels![item.index || 0] as string;
            return text + ':';
          },
          afterLabel: () => 'Average',
          footer: () => 'Score',
          afterFooter: (item, data) => `${item[0].value}`,
          labelColor: () => ({
            borderColor: '#fff',
            backgroundColor: '#fff',
          }),
        },
        xPadding: 10,
        yPadding: 10,
        mode: 'point',
        bodyFontSize: 16,
        footerFontSize: 16,
        backgroundColor: '#202424',
        bodyAlign: 'center',
        cornerRadius: 5,
        footerFontColor: '#fff',
        footerSpacing: 8,
        footerMarginTop: 14,
        caretSize: 5,
        caretPadding: 12,
      },
      responsive: true,
    };
  }
}
