import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DmsImportDeal, ProviderCode, dmsImportDealsData, providersData } from '@app/entities';
import { PipesModule } from '@app/shared/pipes';
import { MockDialogService, ModalService } from '@app/shared/services';
import { MockActivatedRoute, MockRouterService } from '@app/shared/testing';
import { of } from 'rxjs';
import { DealImportRequest } from '../../model';
import { DmsImportFacade } from '../../state/dms-import.facade';
import { DmsImportPageComponent } from './dms-import-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const dmsImportDeals = dmsImportDealsData;
const dmsSearch = { searchText: '4001064', providerCode: '32' };
const providers = providersData;
const payload: DealImportRequest = {
  providerCode: '12',
  importId: dmsImportDeals[0].importId,
  dealId: 1,
  dealNo: '3897'
};
describe('DmsImportPageComponent', () => {
  let component: DmsImportPageComponent;
  let fixture: ComponentFixture<DmsImportPageComponent>;
  let dmsImportFacade: DmsImportFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmsImportPageComponent],
      imports: [TranslateModule.forRoot({}), PipesModule, MatTooltipModule],
      providers: [
        {
          provide: DmsImportFacade,
          useValue: {
            deals$: of(dmsImportDeals),
            loaded$: of(false),
            searchDeal: jest.fn(),
            dealImport: jest.fn(),
            resetEvent: jest.fn(),
            checkDuplicateImport: jest.fn(),
            reImportModel$: of({ reImportedId: 1, isRemorted: true }),
          },
        },
        {
          provide: ModalService,
          useValue: MockDialogService,
        },
        {
          provide: Router,
          useValue: MockRouterService,
        },
        {
          provide: ActivatedRoute,
          useValue: MockActivatedRoute,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmsImportPageComponent);
    component = fixture.componentInstance;
    component.dmsForm = dmsSearch;
    component.provider = providers;
    component.reImportedId = 2;
    component.actionData = dmsImportDeals[0];
    fixture.detectChanges();
    dmsImportFacade = TestBed.inject(DmsImportFacade);
  });

  describe('DmsImportPageComponent', () => {
    it('should ...', () => {
      expect(component).toBeTruthy();
      expect(dmsImportFacade).toBeTruthy();
    });

    describe('should searchDeal method', () => {
      it('should check when search value is same with form value', () => {
        component.dmsForm.searchText = 'test';
        component.searchDeal('test');
        expect(component.dmsForm.searchText).toBe('test');
      });
      it('should call searchDeal method with searched value', () => {
        const mockDealImport = jest.spyOn(dmsImportFacade, 'searchDeal');
        component.searchDeal('text');
        dmsSearch.searchText = 'text';
        expect(mockDealImport).toHaveBeenCalled();
        expect(mockDealImport).toHaveBeenCalledWith(dmsSearch);
      });

      it('should check when providerCode value is empty', () => {
        component.dmsForm.providerCode = null;
        component.searchDeal('test');
        expect(component.dmsForm.providerCode).toBe(ProviderCode.Lightspeed);
      });
    });
    it('should providerSelection', () => {
      component.providerSelection(providers);
      expect(component.provider).toStrictEqual(providers);
    });

    it('should dealImport method', () => {
      const mockDealImport = jest.spyOn(dmsImportFacade, 'dealImport');
      component.dealImport();
      expect(mockDealImport).toHaveBeenCalled();
      expect(mockDealImport).toHaveBeenCalledWith(payload);
    });

    it('should be handle dmsDealAction method', () => {
      const spy = jest.spyOn(dmsImportFacade, 'checkDuplicateImport');
      const dmsImportDealsData: DmsImportDeal =
      {
        importId: '4001064',
        dealNo: '3897',
        primaryCustomerName: 'John',
        secondaryCustomerName: 'Smith',
        vin: 'JH2AF7715PK601114',
        unit: 'HONDA',
        amountFinanced: 212,
        status: 'Imported',
        lastModifiedDate: '2023-04-17T09:25:31.7094687',
      };
      component.actionData = dmsImportDealsData;
      component.dmsDealAction(dmsImportDealsData);

      expect(spy).toHaveBeenCalledWith(payload);
    });
  });
  
  it('should call goBack method', () => {
    const router = TestBed.inject(Router);
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');
    component.goBack();
    expect(navigateByUrlSpy).toHaveBeenCalled();
  });
});
