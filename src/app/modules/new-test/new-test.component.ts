import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from 'src/app/models/test';
import { NewTestService } from './new-test.service';
import { ROUTES } from '../../constants/routes';
import { UploadService } from 'src/app/shared/services/upload.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss'],
})
export class NewTestComponent implements OnInit {
  ROUTES = ROUTES;
  answers: Test = {};
  imgBlob: Blob | null = null;
  loading: boolean = false;
  getResults: boolean = false;
  error: string | null = null;
  minDate!: Date;
  maxDate!: Date;
  dateUploadTest: Date = new Date();
  timeUploadTest: any = new Date().getHours() + ':' + new Date().getMinutes();
  createdAt: Date = new Date();
  maxTime!: string;

  constructor(
    private newTestService: NewTestService,
    private router: Router,
    private uploadService: UploadService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date();
    this.maxTime = this.datePipe.transform(new Date(), 'h:mm a z')!;
  }

  selectAnswer(event: string, type: string) {
    switch (type) {
      case 'glasses':
        this.answers.waterIntake = Number(event);
        break;
      case 'days':
        this.answers.exercise = Number(event);
        break;
      case 'drinks':
        this.answers.alcoholDrinks = Number(event);
        break;
      case 'diet':
        this.answers.dietChange = event;
        break;
      default:
        break;
    }
  }

  async onSubmit() {
    if (this.imgBlob) {
      this.loading = true;
      try {
        const url = await this.uploadService.uploadImage('tests', this.imgBlob);
        this.answers.cardPhoto = url;
      } catch (err) {
        this.loading = false;
        this.error = err as string;
        this.imgBlob = null;
        return;
      }
    }

    let newDate = this.datePipe.transform(this.dateUploadTest, 'MM-dd-yyyy');

    this.createdAt = new Date(newDate + ' ' + this.timeUploadTest);

    this.answers.createdAt = this.createdAt;

    const results = await this.newTestService.handleResults();

    this.newTestService
      .postNewTest({ ...this.answers, results })
      .then(() => {
        this.getResults = true;
        this.loading = false;
      })
      .catch((err) => {
        this.error = err;
        this.imgBlob = null;
        this.loading = false;
      });
  }

  onChangeImage(event: Blob | null) {
    this.imgBlob = event;
  }

  onRedirect(to: string) {
    if (to === 'home') {
      this.router.navigate([this.ROUTES.HOME_PAGE]);
    } else {
      this.router.navigate([this.ROUTES.RESULTS_PAGE]);
    }
  }
}
