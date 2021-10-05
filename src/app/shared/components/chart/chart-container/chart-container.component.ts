import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { OPTIONS_Date, OPTIONS_FILTER } from 'src/app/constants/result';
import { Result } from 'src/app/models/result';
import { ResultsService } from 'src/app/modules/results/results.service';
import {
  filterResultsRangeDate,
  getLabels,
  getParametersDetails,
  handelDataSet,
} from '../chart.utils';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss'],
})
export class ChartContainerComponent implements OnInit, OnChanges {
  @Input() chartResults: Result[] = [];
  @Input() type!: string;
  @Input() paramName!: string;
  @Output() resultChanged = new EventEmitter();

  options: string[] = OPTIONS_FILTER;
  listOfDateOption: string[] = OPTIONS_Date;

  filteredResults!: Result[];
  rangeOfDate!: string;
  numberOfTests!: number;
  maxDate!: Date;
  minDate!: Date;

  selectedChoice: string | null = null;
  selectedNumber!: number;

  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  pickerSelectedRange: Date[] = [new Date()];
  dateRange: DateRange<Date> = new DateRange(new Date(), null);
  selectedOption!: string;

  isMonthCurr!: boolean;
  startAtCurr: any;
  startAtPrev: any;

  // handle Results for chart
  ChartBarInputs!: any;
  ChartLineInputs!: any;

  constructor(
    private datePipe: DatePipe,
    private resultService: ResultsService
  ) {}

  ngOnInit(): void {
    this.selectedOption = 'Today';
    this.minDate = this.chartResults[0].createdAt!;
    this.maxDate = new Date();
    this.isMonthCurr = true;
    const today = new Date();
    this.startAtCurr = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startAtPrev = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  }

  ngOnChanges() {
    this.handleFilterResults(this.chartResults);
  }

  handleFilterResults(result: Result[], fromPicker: boolean = false) {
    let range: string = '';
    this.filteredResults = result;

    if (this.filteredResults.length > 0) {
      this.handelResultsForChart();
    }

    this.resultService.resultsFilterChange.next({
      results: this.filteredResults,
      type: this.type,
    });

    if (fromPicker) {
      range =
        this.pickerSelectedRange.length < 2
          ? this.datePipe.transform(this.pickerSelectedRange[0], 'MMM dd,YYY') +
            ''
          : this.datePipe.transform(this.pickerSelectedRange[0], 'MMM dd,YYY') +
            ' - ' +
            this.datePipe.transform(this.pickerSelectedRange[1], 'MMM dd,YYY');
    } else {
      if (result.length > 1) {
        range = this.getRangeOfTest(
          result[0].createdAt,
          result[result.length - 1].createdAt
        );
      } else {
        range = this.getRangeOfTest(result[0].createdAt, null);
      }
    }

    this.rangeOfDate = range;

    this.numberOfTests = result.length;
    this.selectedNumber = result.length;
  }

  handelResultsForChart() {
    const labels = getLabels(this.filteredResults, this.datePipe);
    const resultsDetails: any = getParametersDetails(this.filteredResults);
    const datasets = handelDataSet(this.paramName, resultsDetails);

    this.ChartBarInputs = {
      labels,
      datasets: [
        {
          data: resultsDetails[this.paramName!].data,
          label: resultsDetails[this.paramName!].label,
        },
      ],
    };

    this.ChartLineInputs = {
      labels,
      datasets,
    };
  }

  getRangeOfTest(from: any, to: any): string {
    if (to) {
      let strFrom = this.datePipe.transform(from, 'MMM dd,YYY');
      let strTo = this.datePipe.transform(to, 'MMM dd,YYY');
      return strFrom! + ' - ' + strTo!;
    } else {
      let strFrom = this.datePipe.transform(from, 'MMM dd,YYY');
      return strFrom!;
    }
  }

  onSelectOptions(value: any) {
    this.selectedChoice = value;
    if (value === 'All of tests') {
      this.handleFilterResults(this.chartResults);
    }
  }

  up() {
    let inc = this.selectedNumber + 1;
    this.selectedNumber =
      inc <= this.chartResults.length ? inc : this.chartResults.length;
  }

  down() {
    let dec = this.selectedNumber - 1;
    this.selectedNumber = dec > 1 ? dec : 1;
  }

  closePopup(key: string | null = null) {
    if (!!!key) {
      this.selectedChoice = null;
      this.selectedNumber = this.numberOfTests;
      return;
    }

    if (key === 'numberOfTests') {
      const resultsSliced = this.chartResults.slice(-this.selectedNumber);
      this.handleFilterResults(resultsSliced);
    } else if (key === 'rangeOfDate') {
      const resultsSliced = filterResultsRangeDate(
        this.chartResults,
        this.pickerSelectedRange[0],
        this.pickerSelectedRange[1]
      );

      this.handleFilterResults(resultsSliced, true);
    }

    this.selectedChoice = null;
  }

  changeDatePicker(event: any, key: string) {
    if (key === 'dateFrom') {
      this.dateFrom = event;
    } else {
      this.dateTo = event;
    }

    // handle precedence in dateFrom & dateTo
    if (this.dateFrom && this.dateTo) {
      let numFrom = new Date(this.dateFrom);
      let numTo = new Date(this.dateTo);

      if (numFrom > numTo) {
        this.dateFrom = this.dateTo;
      } else if (numTo < numFrom) {
        this.dateTo = this.dateFrom;
      } else if (numTo == numFrom) {
        this.dateTo = this.dateFrom;
      }
    }

    this.renderSelected(this.dateFrom, this.dateTo);
  }

  renderSelected(start: Date | null, end: Date | null) {
    this.pickerSelectedRange = [start! || end, end! || start];
    this.dateRange = new DateRange(start, end);
  }

  HandleListOfDate(option: string) {
    this.selectedOption = option;
    // to avoid override on the same object. which new Date() return object.
    // instead of write new date() to make line short.
    let date = () => new Date();
    let datePoints = {
      today: date(),
      yesterday: new Date(date().setDate(date().getDate() - 1)),
      lastWeek: new Date(date().setDate(date().getDate() - 7)),
      thisMonth: new Date(date().getFullYear(), date().getMonth(), 1),
      lastMonth: new Date(date().getFullYear(), date().getMonth() - 1, 1),
      lastMonthEnd: new Date(date().getFullYear(), date().getMonth(), 0),
    };

    if (option === 'Last Month') {
      this.isMonthCurr = false;
    } else {
      this.isMonthCurr = true;
    }

    switch (option) {
      case 'Today':
        this.renderSelected(datePoints.today, date());
        break;
      case 'Yesterday':
        this.renderSelected(datePoints.yesterday, datePoints.yesterday);
        break;
      case 'Last week':
        this.renderSelected(datePoints.lastWeek, date());
        break;
      case 'This Month':
        this.renderSelected(datePoints.thisMonth, date());
        break;
      case 'Last Month':
        this.renderSelected(datePoints.lastMonth, datePoints.lastMonthEnd);
        break;
      default:
        this.renderSelected(datePoints.today, date());
        break;
    }
  }
}
