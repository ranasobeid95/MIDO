import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UiService } from './shared/services/ui.service';
import { ROUTES } from './constants/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  ROUTES = ROUTES;
  title = 'MiProbes';
  isAuth: boolean = false;
  isLoading: boolean = true;

  showNav!: boolean;
  showFooter!: boolean;

  email: string = '';
  showVerify: boolean = false;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uiService: UiService
  ) {}

  ngAfterViewInit() {
    this.uiService.showVerifyChanged
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((show) => {
        this.showVerify = show;
      });
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.rootRoute(this.activatedRoute)),
        filter((route: ActivatedRoute) => {
          return route.outlet === 'primary';
        }),
        mergeMap((route: ActivatedRoute) => route.data)
      )
      .subscribe((event: { [name: string]: any }) => {
        this.showFooter = event.showFooter;
        this.showNav = event.showNav;
      });

    this.authService
      .getUserChange()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user) => {
        this.email = user?.email || '';
        this.isAuth = !!user;

        this.isLoading = false;

        if (user && !user.emailVerified) {
          this.uiService.showVerifyChanged.next(true);
        }
      });

    this.authService.initAuthListener();
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
