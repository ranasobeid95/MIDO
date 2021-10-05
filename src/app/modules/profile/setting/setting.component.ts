import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTES } from 'src/app/constants/routes';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  param: string = 'account';
  ROUTES = ROUTES;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.param = params.get('type')!;
      this.checkCorrectParam(this.param);
    });
  }

  checkCorrectParam(type: string | null) {
    if (type === 'account' || type === 'password') {
      return;
    }
    this.router.navigate([this.ROUTES.PAGE_NOT_FOUND]);
  }

  navigateTo(param: string) {
    this.param = param;
    if (param === 'account') {
      this.router.navigate(['profile/setting', 'account']);
    } else {
      this.router.navigate(['profile/setting', 'password']);
    }
  }
}
