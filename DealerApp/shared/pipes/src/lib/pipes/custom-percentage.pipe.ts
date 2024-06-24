import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percent',
})
export class CustomPercentagePipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value?: number, digitInfo = '1.2-2'): string {
    value = value ?? 0;
    const formattedValue = this.decimalPipe.transform(value, digitInfo);
    return `${formattedValue}%`;
  }
}
