import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { CompareDirective } from './compare.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form #form="ngForm">
      <ng-container ngModelGroup="taxIdGroup" #taxIdGroup="ngModelGroup" appCompare>
        <input [(ngModel)]="taxId" name="taxId">
        <input [(ngModel)]="confirmSsn" name="confirmSsn">
      </ng-container>
    </form>
  `,
})
class TestComponent {
  @ViewChild('form', { static: false }) public form: NgForm;
  taxId = '';
  confirmSsn = '';
}

describe('CompareDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, CompareDirective],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new CompareDirective();
    expect(directive).toBeTruthy();
  });
  
  it('should have inputs elements', () => {
    expect(inputEl).not.toBeNull();
  });

  it('should validate matching fields', () => {
    const group = component.form.controls['taxIdGroup'];
    const taxId = group['controls']['taxId'];
    const confirmSsn = group['controls']['confirmSsn'];
    taxId.setValue('123');
    confirmSsn.setValue('123');
    expect(confirmSsn.errors).toEqual(null);
  });
});
