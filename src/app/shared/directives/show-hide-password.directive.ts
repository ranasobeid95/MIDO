import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appShowHidePassword]',
})
export class ShowHidePasswordDirective implements OnInit {
  el!: HTMLElement;
  type: string = 'password';
  @Input() target!: HTMLInputElement;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.el = this.elRef.nativeElement;
    this.el.textContent = 'visibility_off';
  }

  @HostListener('click') onClick() {
    if (this.isTypePass()) {
      this.type = 'text';
      this.target.type = this.type;
      this.el.textContent = 'visibility';
    } else {
      this.type = 'password';
      this.target.type = this.type;
      this.el.textContent = 'visibility_off';
    }
  }

  isTypePass() {
    return this.type === 'password';
  }
}
