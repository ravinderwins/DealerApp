import { UpperCasePipe } from '@angular/common';
import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ngModel][upperCase]',
  providers: [UpperCasePipe],
})
export class UpperCaseDirective {
  constructor(private readonly control: NgControl) {}

  @HostListener('input', ['$event.target'])
  public onInput(input: HTMLInputElement): void {
    const caretPos = input.selectionStart;
    this.control.control.setValue(input.value.toUpperCase());
    input.setSelectionRange(caretPos, caretPos);
  }

}
