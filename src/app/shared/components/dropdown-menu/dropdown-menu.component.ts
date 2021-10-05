import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ROUTES } from '../../../constants/routes';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() clickedLink = new EventEmitter();

  ROUTES = ROUTES;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.signout();
  }

  closeDropDown() {
    this.clickedLink.emit();
  }
}
