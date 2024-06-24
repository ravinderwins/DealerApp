import { DmsImportDeal } from '@app/entities';
import * as DmsImportActions from './dms-import.actions';
import { DmsImportState, dmsImportReducer } from './dms-import.reducer';
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

const initialState: DmsImportState = {
  deals: dmsImportDeals,
  loaded: false,
  reImportedId: null,
  isReimported: false
};

describe('DmsImport Reducer', () => {
  it('should handle getNotesSuccess action', () => {
    const action = DmsImportActions.searchDealSuccess({ data: dmsImportDeals });
    const state = dmsImportReducer(initialState, action);
    expect(state.deals).toStrictEqual(dmsImportDeals);
  });

  it('should handle resetEvent action', () => {
    const action = DmsImportActions.resetEvent();
    const state = dmsImportReducer(initialState, action);
    expect(state.deals).toStrictEqual([]);
  });

  it('should handle updateReimported action', () => {
    const action = DmsImportActions.updateReimported({data:false});
    const state = dmsImportReducer(initialState, action);
    expect(state.isReimported).toStrictEqual(false);
  });
});
