import { ChartType } from 'chart.js';

export interface ChartMetaData {
  title: string;
  chartType: ChartType;
  mainChart: boolean;
  parameter: boolean;
  isProfile: boolean;
}
