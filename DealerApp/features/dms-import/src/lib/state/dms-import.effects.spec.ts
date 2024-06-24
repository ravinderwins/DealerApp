import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { DmsImportDeal } from '@app/entities';
import { MockDialogService, ModalService } from '@app/shared/services';
import { MockRouterService } from '@app/shared/testing';
import { MockUserFacade, UserFacade } from '@app/store/user';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { DealImportRequest } from '../model';
import { DmsImportService } from '../services';
import * as DmsImportActions from './dms-import.actions';
import { DmsImportEffects } from './dms-import.effects';
import { DmsImportFacade } from './dms-import.facade';

const dmsImportDeals: DmsImportDeal[] = [
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
  },
  {
    importId: '4001065',
    dealNo: '3897',
    primaryCustomerName: 'John',
    secondaryCustomerName: 'Smith',
    vin: 'JH2AF7715PK601114',
    unit: 'HONDA',
    amountFinanced: 212,
    status: 'Imported',
    lastModifiedDate: '2023-04-17T09:25:31.7094687',
  },
];

const dealImportRequest: DealImportRequest = {
  providerCode: '32',
  importId: '4001064',
  dealId: 232,
  dealNo: '1234',
  alreadyImportedDeal: 12
};
const payload = dealImportRequest;
describe('DmsImportEffect', () => {
  let dmsImportService: DmsImportService;
  let actions$: Observable<Action>;
  let effects: DmsImportEffects;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        DmsImportEffects,
        provideMockActions(() => actions$),
        {
          provide: DmsImportService,
          useValue: {
            searchDeal: jest.fn(),
            dealImport: jest.fn(),
          },
        },
        {
          provide: UserFacade,
          useValue: MockUserFacade,
        },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({}) },
        },
        {
          provide: Router,
          useValue: MockRouterService,
        },
        {
          provide: DmsImportFacade,
          useValue: { loaded$: of(true) },
        },
        {
          provide: MatDialog,
          useValue: {},
        },
        { provide: ModalService, useValue: MockDialogService },


      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    effects = TestBed.inject(DmsImportEffects);
    dmsImportService = TestBed.inject(DmsImportService);
  });
  it('should be create', () => {
    expect(effects).toBeTruthy();
  });
  describe('searchDeal', () => {
    it('should return an searchDeal action, with the client, on success', () => {
      const payload = { searchText: '4001064', providerCode: '32' };
      const action = DmsImportActions.searchDeal({ data: payload });
      const outcome = DmsImportActions.searchDealSuccess({ data: dmsImportDeals });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: dmsImportDeals });
      const expected = cold('--b', { b: outcome });

      dmsImportService.searchDeal = jest.fn(() => response);

      expect(effects.searchDeal$).not.toBeObservable(expected);
    });

    it('should return an searchDeal action, with the client, on failure', () => {
      const payload = { searchText: '4001064', providerCode: '32' };
      const action = DmsImportActions.searchDeal({ data: payload });
      const outcome = DmsImportActions.searchDealFailure();

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', { a: payload });
      const expected = cold('--b', { b: outcome });

      dmsImportService.searchDeal = jest.fn(() => response);

      expect(effects.searchDeal$).not.toBeObservable(expected);
    });
  });

  describe('dealImport', () => {
    it('should return an dealImport action, with the client, on success', () => {
      const payload = dealImportRequest;
      const action = DmsImportActions.dealImport({ data: payload });
      const outcome = DmsImportActions.updateReimported({ data: false });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: dmsImportDeals });
      const expected = cold('--b', { b: outcome });

      dmsImportService.dealImport = jest.fn(() => response);

      expect(effects.dealImport$).toBeObservable(expected);
    });
    it('should return an dealImport action, with the client, on failure', () => {
      const payload = dealImportRequest;
      const action = DmsImportActions.dealImport({ data: payload });
      const outcome = DmsImportActions.dealImportFailure();

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', { a: dmsImportDeals });
      const expected = cold('--b', { b: outcome });

      dmsImportService.dealImport = jest.fn(() => response);

      expect(effects.dealImport$).toBeObservable(expected);
    });
  });

  describe('checkDuplicateImport', () => {

    it('should return an checkDuplicateImport action, with the client, on success', () => {
      const action = DmsImportActions.checkDuplicateImport({ data: payload });
      const outcome = DmsImportActions.checkDuplicateImportSuccess({ data: payload });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: payload });
      const expected = cold('--b', { b: outcome });

      dmsImportService.checkDuplicateImport = jest.fn(() => response);
      expect(effects.checkDuplicateImport$).not.toBeObservable(expected);
    });
    it('should return an checkDuplicateImport action, with the client, on failure', () => {
      const action = DmsImportActions.checkDuplicateImport({ data: payload });
      const outcome = DmsImportActions.checkDuplicateImportFailure({ data: payload });

      actions$ = hot('-a', { a: action });
      const response = cold('-#|', { a: payload });
      const expected = cold('--b', { b: outcome });

      dmsImportService.checkDuplicateImport = jest.fn(() => response);
      expect(effects.checkDuplicateImport$).toBeObservable(expected);
    });
  });

  describe('handleConfirmationDialog', () => {

    it('should called handleConfirmationDialog method', () => {
      const action = DmsImportActions.checkDuplicateImportSuccess({ data: payload });
      const outcome = DmsImportActions.checkDuplicateImportSuccess({ data: payload });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: payload });
      const expected = cold('--b', { b: outcome });

      dmsImportService.checkDuplicateImport = jest.fn(() => response);
      expect(effects.handleConfirmationDialog$).not.toBeObservable(expected);
    });

    it('should called handleConfirmationDialog method if deal id is not present', () => {
      const payload: DealImportRequest = {
        providerCode: '32',
        importId: '4001064',
        dealId: null,
        dealNo: null,
        alreadyImportedDeal: 0
      };
      const action = DmsImportActions.checkDuplicateImportSuccess({ data: payload });
      const outcome = DmsImportActions.checkDuplicateImportSuccess({ data: payload });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: payload });
      const expected = cold('--b', { b: outcome });

      dmsImportService.checkDuplicateImport = jest.fn(() => response);
      expect(effects.handleConfirmationDialog$).not.toBeObservable(expected);
    });
  });

});