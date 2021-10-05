import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ROUTES } from 'src/app/constants/routes';
import { AuthService } from '../auth/auth.service';
import { NewTestService } from '../new-test/new-test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userName: any;
  ROUTES = ROUTES;
  private unsubscribe: Subject<void> = new Subject();
  createdAt!: Date;

  constructor(
    private authService: AuthService,
    private newTestService: NewTestService
  ) {}

  ngOnInit(): void {
    this.authService
      .getUserChange()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user) => {
        this.userName = user?.firstName;
      });

    this.userName = this.authService.getUser()?.firstName;
    if (this.userName) {
      this.newTestService.getAllTests().then((tests) => {
        if (tests[0]) this.createdAt = tests[0].createdAt;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
