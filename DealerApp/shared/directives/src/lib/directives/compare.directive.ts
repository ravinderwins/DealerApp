import { Directive, Input } from '@angular/core';
import { AbstractControl, UntypedFormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appCompare]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CompareDirective, multi: true }],
})
export class CompareDirective implements Validator {
  @Input() appCompare: any;
  private valFn: any;

  validatePassword(): ValidatorFn {
    return (control: AbstractControl) => {
      let isValid = false;
      if (control && control instanceof UntypedFormGroup) {
        const group = control as UntypedFormGroup;
        if (group.controls['taxId'] && group.controls['confirmSsn']) {
          const taxId = group.controls['taxId'].value  ? group.controls['taxId'].value : '';
          const confirmSsn = group.controls['confirmSsn'].value ? group.controls['confirmSsn'].value : '';
          isValid = taxId == confirmSsn;
        }
      }
      if (isValid) {
        return null;
      } else {
        return { notMatch: true };
      }
    };
  }

  constructor() {
    this.valFn = this.validatePassword();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.valFn(c);
  }
}
