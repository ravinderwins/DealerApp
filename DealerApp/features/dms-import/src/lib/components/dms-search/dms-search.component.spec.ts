import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MockRouterService } from '@app/shared/testing';
import { DmsSearchComponent } from './dms-search.component';

describe('DmsSearchComponent', () => {
  let component: DmsSearchComponent;
  let fixture: ComponentFixture<DmsSearchComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmsSearchComponent],
      imports: [FormsModule, TranslateModule.forRoot({})],
      providers: [{ provide: Router, useValue: MockRouterService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsSearchComponent);
    component = fixture.componentInstance;
    component.searchText = '212';
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should searchDeal method with setTimeout', fakeAsync(() => {
    const searchText = 'search text';
    component.searchText = searchText;
    const emitSpy = jest.spyOn(component.searchDmsDeal, 'emit');
    component.searchDeal();
    tick(0);
    expect(emitSpy).toHaveBeenCalledWith(searchText);
    expect(component.searchText).toEqual(searchText);
  }));
});
