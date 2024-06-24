import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateFeatureKey } from '@app/entities';
import { DmsImportState } from './dms-import.reducer';

export const getDealProductState = createFeatureSelector<DmsImportState>(StateFeatureKey.DmsImport);
export const deals = createSelector(getDealProductState, (state: DmsImportState) => state.deals);
export const loaded = createSelector(getDealProductState, (state: DmsImportState) => state.loaded);
export const reImportedId = createSelector(getDealProductState, (state: DmsImportState) => state.reImportedId);
export const isReimported = createSelector(getDealProductState, (state: DmsImportState) => state.isReimported);
export const reImportModel = createSelector(reImportedId, isReimported, (reImportedId, isReimported) => {
  return { reImportedId, isReimported: isReimported };
});
