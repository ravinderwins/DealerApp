import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingFooterUrlComponent } from './listing-footer-url.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ListingFooterUrlComponent', () => {
  let component: ListingFooterUrlComponent;
  let fixture: ComponentFixture<ListingFooterUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingFooterUrlComponent],
      imports: [TranslateModule.forRoot({})]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingFooterUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
