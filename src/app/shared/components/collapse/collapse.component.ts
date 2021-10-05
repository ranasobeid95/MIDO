import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
})
export class CollapseComponent implements OnInit {
  @Input() header!: string;
  @Input() content!: string;
  @Input() second = false;
  @Input() third = false;

  showContent: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  @ViewChild('contentShow') contentShow!: ElementRef;

  onShowContent() {
    this.showContent = !this.showContent;

    let elem = this.contentShow.nativeElement as HTMLElement;

    if (elem.clientHeight) {
      this.renderer.setStyle(elem, 'height', '0');
    } else {
      const height = elem.scrollHeight + 15 + 'px';
      this.renderer.setStyle(elem, 'height', height);
    }
  }
}
