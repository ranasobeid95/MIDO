import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appDetectScroll]',
})
export class DetectScrollDirective {
  @Input() parentEl!: HTMLElement;
  @Output() closed = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  @HostListener('window:scroll', ['$event']) onScroll() {
    const windowY = window.scrollY;

    // get position for Parent Element
    // 30 & 60 to make 30 px after exceeding parent element to hide
    const parentClient = this.parentEl.getBoundingClientRect();
    const parentOffsetTop = parentClient.top + windowY - 30;
    const parentOffsetBottom = parentOffsetTop + parentClient.height + 60;

    // get position for the Element
    const elementClient = this.elementRef.nativeElement.getBoundingClientRect();
    const elementOffsetTop = elementClient.top + windowY;
    const elementOffsetBottom = elementOffsetTop + elementClient.height;
    if (
      elementOffsetBottom < parentOffsetTop ||
      elementOffsetTop > parentOffsetBottom
    ) {
      this.closed.emit();
    }
  }
}
