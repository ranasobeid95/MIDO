import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ROUTES } from 'src/app/constants/routes';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  showSideNav: boolean = false;
  showDropdownMenu: boolean = false;
  user: User | null = null;
  ROUTES = ROUTES;
  defaultImage: string = '../../../../assets/images/bear.jpg';
  private unsubscribe: Subject<void> = new Subject();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .getUserChange()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user) => {
        this.user = user;
      });

    let user = this.authService.getUser();
    this.user = user && user;
  }

  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  toggleDropdownMenu() {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  // Auto Close sidebar when screen Extend
  @HostListener('window:resize', ['$event']) onResize(event: any) {
    const width = event.target.innerWidth;
    if (width >= 600) {
      this.showSideNav = false;
    } else if (width <= 600) {
      this.showDropdownMenu = false;
    }
  }

  closeDropDown() {
    if (this.showDropdownMenu) {
      this.showDropdownMenu = false;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
