import {
  Directive,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appOffClick]',
})
export class OffClickDirective {
  @Output() clickOutside = new EventEmitter();

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('document:click', ['$event.target']) onClick(
    targetElement: HTMLElement
  ) {
    const parent = document.querySelector('#parentDrop');

    const dropdownClicked = this.elRef.nativeElement.contains(targetElement);
    const parentClicked = parent?.contains(targetElement);

    if (dropdownClicked || parentClicked) {
      return;
    }

    this.clickOutside.emit();
  }
}
