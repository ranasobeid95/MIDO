import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ROUTES } from 'src/app/constants/routes';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter();
  @Input() user: User | null = null;
  showNested: boolean = false;
  ROUTES = ROUTES;
  defaultImage: string = '../../../../assets/images/bear.jpg';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  toggleNested() {
    this.showNested = !this.showNested;
  }

  onCloseSideNav() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.authService.signout();
  }
}
