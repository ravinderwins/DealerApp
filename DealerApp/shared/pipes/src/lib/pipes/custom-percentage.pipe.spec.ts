import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { CustomPercentagePipe } from './custom-percentage.pipe';

describe('CustomPercentagePipe', () => {
  let customPercentagePipe: CustomPercentagePipe;
  let decimalPipe: DecimalPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecimalPipe, CustomPercentagePipe],
    });

    customPercentagePipe = TestBed.inject(CustomPercentagePipe);
    decimalPipe = TestBed.inject(DecimalPipe);
  });

  it('should create an instance', () => {
    expect(customPercentagePipe).toBeTruthy();
  });

  it('should handle undefined input', () => {
    const formattedValue = customPercentagePipe.transform(undefined);
    const expectedFormattedValue = '0.00%';
    expect(formattedValue).toEqual(expectedFormattedValue);
  });

  it('should handle null input', () => {
    const formattedValue = customPercentagePipe.transform(null);
    const expectedFormattedValue = '0.00%';
    expect(formattedValue).toEqual(expectedFormattedValue);
  });

  it('should handle zero input', () => {
    const formattedValue = customPercentagePipe.transform(0);
    const expectedFormattedValue = '0.00%';
    expect(formattedValue).toEqual(expectedFormattedValue);
  });
});
