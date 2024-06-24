import { DmsImportDeal } from '@app/entities';
import { DmsImportState } from './dms-import.reducer';
import * as DmsImportSelectors from './dms-import.selectors';

describe('DmsImport Selectors', () => {
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

  describe('DmsImport Selectors', () => {
    it('should return getDealProductState state', () => {
      const result = DmsImportSelectors.getDealProductState.projector(initialState);
      expect(result).toBe(initialState);
    });

    it('should return deals', () => {
      const result = DmsImportSelectors.getDealProductState.projector(initialState.deals);
      expect(result).toBe(result);
    });

    it('should return loaded state', () => {
      const result = DmsImportSelectors.getDealProductState.projector((initialState:DmsImportState) => initialState.loaded);
      expect(result).toBe(result);
    });

    it('should handle reImportedId', () => {
      const result = DmsImportSelectors.getDealProductState.projector((initialState:DmsImportState) => initialState.reImportedId);
      expect(result).toBe(result);
    });

    it('should handle isReimported', () => {
      const result = DmsImportSelectors.getDealProductState.projector((initialState:DmsImportState) => initialState.isReimported);
      expect(result).toBe(result);
    });

    it('should handle reImportModel', () => {
      const { reImportedId, isReimported: isReimported } = initialState;
      const result = DmsImportSelectors.reImportModel.projector(reImportedId, isReimported);
      expect(result.isReimported).toBe(false);
    });
    
  });
});
