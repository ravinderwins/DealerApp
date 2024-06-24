import { Injectable } from '@angular/core';
import { ApiEndpoints, DataImportApiService, DealsApiService } from '@app/base';
import { DmsImportDeal } from '@app/entities';
import { Observable } from 'rxjs';
import { DealImportRequest, DmsSearch } from '../model';

@Injectable({
  providedIn: 'root',
})
export class DmsImportService {
  constructor(private dataImportApiService: DataImportApiService, private dealsApiService: DealsApiService) { }

  searchDeal(data: DmsSearch, orgId: number): Observable<DmsImportDeal[]> {
    const { providerCode, searchText } = data;
    const url = ApiEndpoints.dataImport.searchDeal(providerCode, orgId, searchText);
    return this.dataImportApiService.get(url);
  }

  dealImport(orgId: number, payload: DealImportRequest): Observable<number> {
    return payload.dealId
      ? this.existingDealImport(orgId, payload)
      : this.newDealImport(orgId, payload);
  }

  newDealImport(orgId: number, payload: DealImportRequest): Observable<number> {
    const url = ApiEndpoints.deals.dealImport(orgId);
    return this.dealsApiService.post(url, payload);
  }

  existingDealImport(orgId: number, payload: DealImportRequest): Observable<number> {
    const url = ApiEndpoints.deals.existingDealImport(orgId, payload.dealId);
    return this.dealsApiService.put(url, payload);
  }

  checkDuplicateImport(orgId: number, providerCode: string, importId: string): Observable<number> {
    const url = ApiEndpoints.deals.checkDuplicateImport(orgId, providerCode, importId);
    return this.dealsApiService.get(url, {}, { hideErrorSnackbar: true });
  }
}
