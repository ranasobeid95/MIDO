import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.scss'],
})
export class CirclesComponent implements OnInit {
  sizeOfCircle!: string;
  @Input() size: number = 20;

  constructor() {}

  ngOnInit(): void {
    this.sizeOfCircle = `${this.size}rem`;
  }
}
