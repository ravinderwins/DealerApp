import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appTrim]',
})
export class TrimDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef, private ngModel: NgModel) {}

  @HostListener('blur')
  onBlur() {
    const value = this.ngModel.model;
    if (!value) return;
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'value', value);
    this.ngModel.update.emit(value);
  }
}
