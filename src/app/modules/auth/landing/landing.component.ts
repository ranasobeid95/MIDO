import { Component, OnInit } from '@angular/core';
import { ROUTES } from 'src/app/constants/routes';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  ROUTES = ROUTES;

  constructor() {}

  ngOnInit(): void {}
}
