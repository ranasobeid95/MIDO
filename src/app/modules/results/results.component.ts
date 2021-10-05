import { DatePipe, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  PARAMETERS_KEYS,
  PARAMETERS_MAIN,
  PARAMETERS_SUB,
} from 'src/app/constants/parameters';
import { ROUTES } from 'src/app/constants/routes';
import { Keys_Value_Select, Result } from 'src/app/models/result';
import { AuthService } from '../auth/auth.service';
import { ResultsService } from './results.service';
import { getSpecificKey } from './results.utils';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy, AfterViewInit {
  userName!: string;
  results!: Result[];
  resultsFiltered!: Result[];
  ROUTES = ROUTES;
  title: string = 'Current Health Status';
  message!: string;
  isNoTests: boolean = false;
  loading: boolean = true;
  paramMessage: string = '';

  changeQueryParam = new Subject();

  private unsubscribe: Subject<void> = new Subject();

  parameterKeys = PARAMETERS_KEYS;
  parametersMain: any = PARAMETERS_MAIN;
  parametersSub: any = PARAMETERS_SUB;

  keyParm!: string;

  constructor(
    private authService: AuthService,
    private resultsService: ResultsService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
    public datePipe: DatePipe
  ) {}

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.userName = this.authService.getUser()?.firstName!;

    this.route.queryParamMap.subscribe((params) => {
      let selected = params.get('para') ? params.get('para') : 'Health';

      this.title = selected!;
      this.changeQueryParam.next();
    });

    this.resultsService
      .fetchAllTests()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        this.loading = false;
        if (res.length === 0) {
          this.message = `You don\'t have any of tests`;
          this.isNoTests = true;
        } else {
          const results = res.map((el: any) => ({
            ...el.results,
            createdAt: el.createdAt,
          }));
          this.results = results;
          this.updateResults();
        }
      });

    this.changeQueryParam.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.updateResults();
    });
  }

  updateResults() {
    let last = this.results.length - 1;
    const keys: Keys_Value_Select = getSpecificKey(this.title);

    this.keyParm = keys.keyValue!;
    this.paramMessage = this.results[last][
      keys.keyText as keyof Result
    ] as string;
  }

  getCardMain(key: string, main: boolean = false) {
    let last = this.results.length - 1;
    let title = this.parametersMain[key].name;
    let icon = false;

    if (main) {
      icon = this.parametersMain[key].imgWhite;
    }
    if (main && this.title === 'Health') {
      title = 'Current Health Status';
    }

    return {
      title,
      percent: this.results[last][key as keyof Result],
      lastAverage:
        this.results.length === 1
          ? null
          : this.results[last - 1][key as keyof Result],
      icon: icon,
    };
  }

  getCardSub(key: string) {
    let last = this.results.length - 1;
    let sliced = key.slice(0, 1).toUpperCase() + key.slice(1, key.length);
    let title = key === 'pH_Score' ? 'PH' : sliced;
    return {
      percent: this.results[last][key as keyof Result],
      title,
    };
  }

  showCard(name: string): boolean {
    return this.title !== name.split(' ')[0];
  }

  public goToTop(param: string | null | undefined): void {
    if (param !== 'Health Status') {
      this.router
        .navigate([this.ROUTES.RESULTS_PAGE], {
          queryParams: { para: param },
        })
        .then(() => {});
    } else {
      this.router.navigate([this.ROUTES.RESULTS_PAGE]).then(() => {});
    }
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public goTo(para: any) {
    if (para) {
      this.router.navigate([this.ROUTES.ABOUT_MIDO], {
        queryParams: { para: para },
      });
    } else {
      this.router.navigate([this.ROUTES.ABOUT_MIDO]);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
