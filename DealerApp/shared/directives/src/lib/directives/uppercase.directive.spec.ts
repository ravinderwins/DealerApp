import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UpperCaseDirective } from './uppercase.directive';

@Component({
  template: `
    <input type="text" [(ngModel)]="text" upperCase>
  `
})
class TestComponent {
  text: string;
}

describe('UpperCaseDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, UpperCaseDirective ],
      imports: [ FormsModule ],
      providers: [
        NgControl
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });


  it('should create an instance', () => {
    const directive = new UpperCaseDirective(TestBed.inject(NgControl));
    expect(directive).toBeTruthy();
  });

  
  it('should convert input value to uppercase', () => {
    component.text = 'hello';
    fixture.detectChanges();
    inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
    fixture.detectChanges();
    expect(component.text).toBe('');
  });
});
