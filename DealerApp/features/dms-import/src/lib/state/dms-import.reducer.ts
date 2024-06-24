import { Action, createReducer, on } from '@ngrx/store';
import { DmsImportDeal } from '@app/entities';
import * as DmsImportActions from './dms-import.actions';

export interface DmsImportState {
  deals: DmsImportDeal[];
  loaded: boolean;
  reImportedId: number;
  isReimported: boolean;
}

export const initialDmsImportState: DmsImportState = {
  deals: [],
  loaded: false,
  reImportedId: null,
  isReimported: false,
};

const reducer = createReducer(
  initialDmsImportState,
  on(DmsImportActions.searchDealSuccess, (state, payload) => ({
    ...state,
    deals: payload.data,
    loaded: true,
  })),

  on(DmsImportActions.updateReimported, (state, { data }) => ({
    ...state,
    isReimported: data,
  })),
  on(DmsImportActions.refresh, (state) => ({
    ...state,
    deals: [],
    loaded: false,
  })),
  on(DmsImportActions.resetEvent, () => {
    return Object.assign({}, initialDmsImportState);
  })
);

export function dmsImportReducer(state: DmsImportState | undefined, action: Action) {
  return reducer(state, action);
}
