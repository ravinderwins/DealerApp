import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DealImportRequest } from '../model';
import { DmsSearch } from '../model/dms-search.model';
import * as DmsImportActions from './dms-import.actions';
import * as DmsImportSelector from './dms-import.selectors';

@Injectable()
export class DmsImportFacade {
  readonly deals$ = this.store.pipe(select(DmsImportSelector.deals));
  readonly loaded$ = this.store.pipe(select(DmsImportSelector.loaded));
  readonly reImportModel$ = this.store.pipe(select(DmsImportSelector.reImportModel));

  constructor(private readonly store: Store) {}

  searchDeal(payload: DmsSearch) {
    this.store.dispatch(DmsImportActions.searchDeal({ data: payload }));
  }

  dealImport(payload: DealImportRequest) {
    this.store.dispatch(DmsImportActions.dealImport({ data: payload }));
  }

  checkDuplicateImport(payload: DealImportRequest) {
    this.store.dispatch(DmsImportActions.checkDuplicateImport({ data: payload }));
  }

  updateReimported(isReported = false) {
    this.store.dispatch(DmsImportActions.updateReimported({ data: isReported }));
  }

  resetEvent() {
    this.store.dispatch(DmsImportActions.resetEvent());
  }

  refresh() {
    this.store.dispatch(DmsImportActions.refresh());
  }
}
