import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DealImportRequest } from '../model';
import * as DmsImportActions from './dms-import.actions';
import { DmsImportFacade } from './dms-import.facade';

const dmsSearch = { searchText: '4001064', providerCode: '32' };

const dealImportRequest: DealImportRequest = {
  providerCode: '32',
  importId: '4001064',
  dealId: 123
};
describe('DmsImport Facade', () => {
  let facade: DmsImportFacade;
  let store: Store;
  let dispatchSpy;

  beforeEach(() => {
    @NgModule({
      imports: [StoreModule.forRoot({})],
      providers: [DmsImportFacade],
    })
    class RootModule { }
    TestBed.configureTestingModule({ imports: [RootModule], schemas: [CUSTOM_ELEMENTS_SCHEMA] });
    store = TestBed.inject(Store);
    facade = TestBed.inject(DmsImportFacade);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
    expect(store).toBeTruthy();
  });

  it('should handle searchDeal action', async () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    facade.searchDeal(dmsSearch);
    expect(dispatchSpy).toBeCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(DmsImportActions.searchDeal({ data: dmsSearch }));
  });

  it('should handle dealImport action', async () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    facade.dealImport(dealImportRequest);
    expect(dispatchSpy).toBeCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(DmsImportActions.dealImport({ data: dealImportRequest }));
  });

  it('should handle resetEvent action', async () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    facade.resetEvent();
    expect(dispatchSpy).toBeCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(DmsImportActions.resetEvent());
  });
  it('should handle refresh action', async () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    facade.refresh();
    expect(dispatchSpy).toBeCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(DmsImportActions.refresh());
  });

  it('should handle updateReimported action', async () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    facade.updateReimported(false);
    expect(dispatchSpy).toBeCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(DmsImportActions.updateReimported({ data: false }));
  });

  it('should handle checkDuplicateImport action', async () => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    facade.checkDuplicateImport(dealImportRequest);
    expect(dispatchSpy).toBeCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(DmsImportActions.checkDuplicateImport({ data: dealImportRequest }));
  });

});
