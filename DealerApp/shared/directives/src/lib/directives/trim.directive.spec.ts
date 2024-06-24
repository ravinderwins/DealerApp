import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TrimDirective } from './trim.directive';

@Component({
  template: '<input [(ngModel)]="value" [appTrim]>',
})
class TestComponent {
  value: string;
}

describe('TrimDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let ngModelMock: NgModel;
  let rendererMock: Renderer2;
  let elementRefMock: ElementRef;
  
  let directive: TrimDirective;
  
  beforeEach(async () => {
    rendererMock = {
      setProperty: jest.fn(),
      setAttribute: jest.fn(),
    } as unknown as Renderer2;
  
    elementRefMock = {
      nativeElement: {
        value: 'test',
      },
    } as unknown as ElementRef;
  
    ngModelMock = {
      model: 'test',
      update: {
        emit: jest.fn(),
      },
    } as unknown as NgModel;
    await TestBed.configureTestingModule({
      declarations: [TrimDirective, TestComponent],
      imports: [FormsModule],
    }).compileComponents();
    directive = new TrimDirective(rendererMock, elementRefMock, ngModelMock);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trim input value on blur', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(component.value).toBe('test');
  });

  it('should not trim an empty value', () => {
    ngModelMock.model = '';
    directive.onBlur();
    expect(rendererMock.setProperty).not.toHaveBeenCalled();
    expect(rendererMock.setAttribute).not.toHaveBeenCalled();
    expect(ngModelMock.update.emit).not.toHaveBeenCalled();
  });
  it('should not trim a null value', () => {
    component
    ngModelMock.model = null;
    directive.onBlur();
    expect(rendererMock.setProperty).not.toHaveBeenCalled();
    expect(rendererMock.setAttribute).not.toHaveBeenCalled();
    expect(ngModelMock.update.emit).not.toHaveBeenCalled();
  });

  it('should set the value property and attribute and emit the update event', () => {
    const expectedValue = 'test';
    directive.onBlur();
    expect(rendererMock.setProperty).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'value',
      expectedValue
    );
    expect(rendererMock.setAttribute).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'value',
      expectedValue
    );
    expect(ngModelMock.update.emit).toHaveBeenCalledWith(expectedValue);
  });
});
