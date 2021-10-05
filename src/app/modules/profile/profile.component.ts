import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ROUTES } from 'src/app/constants/routes';
import { Chart_Radar_Result } from 'src/app/models/chart-radar';
import { Result } from 'src/app/models/result';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth/auth.service';
import { ResultsService } from '../results/results.service';
import { ProfileService } from './profile.service';
import { calculateAge } from './profile.utls';

const LABELS = [
  'overallHealth',
  'immunity',
  'nutrition',
  'hydration',
  'liverHealth',
  'kidney',
];
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  ROUTES = ROUTES;
  userName!: string | null;
  profilePhoto!: string;
  defaultPhoto = '../../../assets/images/bear.jpg';
  userDoc!: User;
  mainInfoValues: any = {}; // used to show or hide elements related with info
  userSubscription!: Subscription;
  results: Result[] = [];
  loading: boolean = true;
  cardInfo: any;
  message!: string;
  isNoTests: boolean = false;
  isLastTestWithoutResult: boolean = false;
  lastTest!: string;
  chartResults!: Chart_Radar_Result;
  private unsubscribe: Subject<void> = new Subject();
  isThereValue: boolean = false;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService,
    private resultService: ResultsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getUserAuth();

    this.profileService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user) => {
        this.userDoc = user;
        this.setMainInfo(this.userDoc);
        this.loading = false;
      });

    this.resultService
      .fetchAllTests()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        this.checkTests(res);
      });
  }

  checkTests(tests: any[]) {
    if (tests.length === 0) {
      // 1) if there is no any tests
      this.message = `You don\'t have any of tests`;
      this.isNoTests = true;
    } else if (tests.length === 1) {
      this.isNoTests = false;
      // 2) if there is one tests without any of results
      if (!!tests[0].results) {
        this.setResults(tests);
      } else {
        const lastDate = tests[tests.length - 1].createdAt;
        const formateDate = this.datePipe.transform(lastDate, 'dd-MM-YYYY');
        this.message = `Your results in ${formateDate} will coming soon!!`;
      }
    } else {
      // 2) if there is more one tests and last one without any of results
      if (!!tests[tests.length - 1].results) {
        this.setResults(tests);
      } else {
        // // No implement last test without any of result
        const lastDate = tests[tests.length - 1].createdAt;

        this.lastTest = `test in ${lastDate} not completed, just some minutes to upload its results!!`;
        this.setResults(tests.slice(0, tests.length - 1));
      }
    }
  }

  setResults(res: any) {
    this.results = res.map((el: any) => ({
      ...el.results,
      createdAt: el.createdAt,
    }));

    this.chartResults = {
      labels: LABELS,
      data: this.getAverageParams(this.results, LABELS),
    };

    this.cardInfo = {
      title: 'Average Health Status',
      percent: this.chartResults.data![0],
      lastAverage: null,
      icon: '../../../assets/icons/results-icons/status-health-light.png',
    };
  }

  getAverageParams(r: Result[], labels: any[]): number[] {
    return r
      .reduce((acc: number[], curr: any, i) => {
        return [
          i === 0 ? curr[labels[0]] : acc[0] + curr[labels[0]],
          i === 0 ? curr[labels[1]] : acc[1] + curr[labels[1]],
          i === 0 ? curr[labels[2]] : acc[2] + curr[labels[2]],
          i === 0 ? curr[labels[3]] : acc[3] + curr[labels[3]],
          i === 0 ? curr[labels[4]] : acc[4] + curr[labels[4]],
          i === 0 ? curr[labels[5]] : acc[5] + curr[labels[5]],
        ];
      }, [])
      .map((val) => Math.round(val / r.length));
  }

  getUserAuth() {
    let userAuth = this.authService.getUser();

    this.userName = userAuth?.firstName + ' ' + userAuth?.lastName;
    this.profilePhoto = userAuth?.profilePhoto
      ? userAuth.profilePhoto
      : this.defaultPhoto;
  }

  goEdit() {
    this.router.navigate(['profile/setting/account']);
  }

  goDetail() {
    this.router.navigate([this.ROUTES.RESULTS_PAGE]);
  }

  // Hide Or show main info if there is or not
  setMainInfo(user: User): void {
    if (user.dateOfBirth) {
      // this function needs enhance and get accurate age
      this.mainInfoValues['dateOfBirth'] = calculateAge(user.dateOfBirth);
    }
    if (user.weight) {
      this.mainInfoValues['weight'] = user.weight;
    }
    if (user.height) {
      this.mainInfoValues['height'] = user.height;
    }
    if (user.healthGoal) {
      this.mainInfoValues['healthGoal'] = user.healthGoal;
    }
    if (user.diet) {
      this.mainInfoValues['diet'] = user.diet;
    }

    this.isThereValue =
      Object.keys(this.mainInfoValues).length >= 1 ? true : false;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
