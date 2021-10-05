import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-card',
  templateUrl: './about-card.component.html',
  styleUrls: ['./about-card.component.scss'],
})
export class AboutCardComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  ngOnInit(): void {}
}
