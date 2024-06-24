import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { providersData } from '@app/entities';
import { MockUtilityService, UtilityService } from '@app/shared/services';
import { DmsDealGridComponent } from './dms-deal-grid.component';

describe('DmsDealGridComponent', () => {
  let component: DmsDealGridComponent;
  let fixture: ComponentFixture<DmsDealGridComponent>;
  let utilityService: UtilityService;
  const provider = providersData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmsDealGridComponent],
      imports: [TranslateModule.forRoot({})],

      providers: [{ provide: UtilityService, useValue: MockUtilityService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsDealGridComponent);
    component = fixture.componentInstance;
    component.provider = provider;
    fixture.detectChanges();

    utilityService = TestBed.inject(UtilityService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should check columns index', () => {
    it('should check amountFinanced column index', () => {
      const mockFormatAmount = jest.spyOn(utilityService, 'formatAmount');
      component.activeColumns[4].formatValue(123);
      expect(mockFormatAmount).toHaveBeenCalled();
    });
    it('should check action template', () => {
      const result = component.activeColumns[5].template();
      expect(result).toBe(component.actionColumn);
    });
  });
});
