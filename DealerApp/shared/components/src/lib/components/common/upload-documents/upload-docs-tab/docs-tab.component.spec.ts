import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocsTabComponent } from './docs-tab.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DocsTabComponent', () => {
  let component: DocsTabComponent;
  let fixture: ComponentFixture<DocsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocsTabComponent],
      imports: [TranslateModule.forRoot({})]
    }).compileComponents();

    fixture = TestBed.createComponent(DocsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should changeTab method', () => {
    const value = true;
    const spy = jest.spyOn(component.tabChange, 'emit');
    component.changeTab(value);
    expect(spy).toHaveBeenCalledWith(value);
  });
});
