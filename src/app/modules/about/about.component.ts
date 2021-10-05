import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ABOUT_PARAMETERS } from 'src/app/constants/about-parameters';
import { PARAMETERS_KEYS, PARAMETERS_MAIN } from 'src/app/constants/parameters';
import { ROUTES } from 'src/app/constants/routes';
import { Parameters_Keys, Result } from 'src/app/models/result';
import { ActivatedRoute } from 'src/app/testing';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  results: Result[] = [];
  ROUTES = ROUTES;
  title: string = 'Health Status';
  loading: boolean = true;
  parametersData: any;

  parametersMain: any = PARAMETERS_MAIN;
  parametersKeys = PARAMETERS_KEYS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.getAllResult();
  }

  getAllResult() {
    this.route.queryParamMap.subscribe((params) => {
      let selected = params.get('para') ? params.get('para') : 'Health Status';

      this.title = selected!;

      if (selected !== 'Health Status') {
        this.parametersData =
          ABOUT_PARAMETERS[`${selected}` as keyof Parameters_Keys];
      }
    });
  }

  public goToTop(param: string | null | undefined): void {
    if (param !== 'Health Status') {
      this.router.navigate([this.ROUTES.ABOUT_MIDO], {
        queryParams: { para: param },
      });
    } else {
      this.router.navigate([this.ROUTES.ABOUT_MIDO]);
    }
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public goTo(id: number): void {
    let eleId = `index${id}`;

    document.getElementById(eleId)!.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
}
