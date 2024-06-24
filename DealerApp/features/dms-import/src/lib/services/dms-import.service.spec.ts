import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ApiEndpoints, DataImportApiService, DealsApiService } from '@app/base';
import { HttpMethod, dmsImportDealsData } from '@app/entities';
import { AppSettings } from '@app/shared/utils';
import { DealImportRequest } from '../model';
import { DmsImportService } from './dms-import.service';

const dealImportRequest: DealImportRequest = {
  providerCode: '32',
  importId: '4001064',
  dealId: 1234
};
describe('DmsImportService', () => {
  let service: DmsImportService;
  let dealsApiService: DealsApiService;
  let dataImportApiService: DataImportApiService;
  let httpMock: HttpTestingController;
  const prefix = 'api/v1';
  const baseApiUrl = `https://app-dev.azurewebsites.net`;
 
  beforeEach(async () => {
    AppSettings.baseApiUrl = baseApiUrl;
    AppSettings.apiVersionPrefix = prefix;
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({}), HttpClientTestingModule],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
    service = TestBed.inject(DmsImportService);
    dealsApiService = TestBed.inject(DealsApiService);
    dataImportApiService = TestBed.inject(DataImportApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should searchDeal is called', () => {
    const orgId = 1;
    const dmsSearch = { searchText: '4001064', providerCode: '32' };
    const mockResponse = dmsImportDealsData;
    const url = ApiEndpoints.dataImport.searchDeal(dmsSearch.providerCode, orgId, dmsSearch.searchText);


    it('should searchDeal method called', () => {
      jest.spyOn(dataImportApiService, 'get');

      const result = service.searchDeal(dmsSearch, orgId);

      expect(dataImportApiService.get).toHaveBeenCalledTimes(1);
      expect(dataImportApiService.get).toHaveBeenCalledWith(url);
      expect(result).toBeInstanceOf(Observable);
    });

    it('should validate searchDeal request success', () => {

      service.searchDeal(dmsSearch, orgId).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
      const expectedUrl = `${baseApiUrl}/dataimport/${prefix}/${url}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(HttpMethod.Get);
    });

    it('should handle searchDeal request error', () => {
      const mockError = { status: 400, statusText: 'Bad Request' };

      service.searchDeal(dmsSearch, orgId).subscribe({
        error(err) {
          expect(err).toEqual(mockError);
        },
      });
      const expectedUrl = `${baseApiUrl}/dataimport/${prefix}/${url}`;
      const req = httpMock.expectOne(expectedUrl);

      expect(req.request.method).toBe(HttpMethod.Get);
    });
  });
  
  describe('should newDealImport is called', () => {
    const orgId = 1;
    const payload = dealImportRequest;
    let mockResponse: 12;
    const url = ApiEndpoints.deals.dealImport(orgId);


    it('should newDealImport method called', () => {
      jest.spyOn(dealsApiService, 'post');

      const result = service.newDealImport(orgId, payload);

      expect(dealsApiService.post).toHaveBeenCalledTimes(1);
      expect(dealsApiService.post).toHaveBeenCalledWith(url, payload);
      expect(result).toBeInstanceOf(Observable);
    });

    it('should validate newDealImport request success', () => {

      service.newDealImport(orgId, payload).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
      const expectedUrl = `${baseApiUrl}/deals/${prefix}/${url}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(HttpMethod.Post);
    });

    it('should handle newDealImport request error', () => {
      const mockError = { status: 400, statusText: 'Bad Request' };

      service.newDealImport(orgId, payload).subscribe({
        error(err) {
          expect(err).toEqual(mockError);
        },
      });
      const expectedUrl = `${baseApiUrl}/deals/${prefix}/${url}`;
      const req = httpMock.expectOne(expectedUrl);

      expect(req.request.method).toBe(HttpMethod.Post);
    });
  });

  describe('should existingDealImport is called', () => {
    const orgId = 1;
    const payload = dealImportRequest;
    let mockResponse: 12;
    const url = ApiEndpoints.deals.existingDealImport(orgId, payload.dealId);


    it('should existingDealImport method called', () => {
      jest.spyOn(dealsApiService, 'put');

      const result = service.existingDealImport(orgId, payload);

      expect(dealsApiService.put).toHaveBeenCalledTimes(1);
      expect(dealsApiService.put).toHaveBeenCalledWith(url, payload);
      expect(result).toBeInstanceOf(Observable);
    });

    it('should validate existingDealImport request success', () => {

      service.existingDealImport(orgId, payload).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
      const expectedUrl = `${baseApiUrl}/deals/${prefix}/${url}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(HttpMethod.Put);
    });

    it('should handle existingDealImport request error', () => {
      const mockError = { status: 400, statusText: 'Bad Request' };

      service.existingDealImport(orgId, payload).subscribe({
        error(err) {
          expect(err).toEqual(mockError);
        },
      });
      const expectedUrl = `${baseApiUrl}/deals/${prefix}/${url}`;
      const req = httpMock.expectOne(expectedUrl);

      expect(req.request.method).toBe(HttpMethod.Put);
    });
  });

  describe('should checkDuplicateImport is called', () => {
    const orgId = 1;
    const provideCode = 'test';
    const importId = '12';
    let mockResponse: 12;
    const url = ApiEndpoints.deals.checkDuplicateImport(orgId, provideCode, importId);
    it('should checkDuplicateImport method called', () => {
      jest.spyOn(dealsApiService, 'get');
      const result = service.checkDuplicateImport(orgId, provideCode, importId);

      expect(dealsApiService.get).toHaveBeenCalledTimes(1);
      expect(dealsApiService.get).toHaveBeenCalledWith(url, {},{'hideErrorSnackbar': true, 'isBackgroudCall': false} );
      expect(result).toBeInstanceOf(Observable);
    });

    it('should validate checkDuplicateImport request success', () => {

      service.checkDuplicateImport(orgId, provideCode, importId).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
      const expectedUrl = `${baseApiUrl}/deals/${prefix}/${url}`;
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe(HttpMethod.Get);
    });

    it('should handle checkDuplicateImport request error', () => {
      const mockError = { status: 400, statusText: 'Bad Request' };

      service.checkDuplicateImport(orgId, provideCode, importId).subscribe({
        error(err) {
          expect(err).toEqual(mockError);
        },
      });
      const expectedUrl = `${baseApiUrl}/deals/${prefix}/${url}`;
      const req = httpMock.expectOne(expectedUrl);

      expect(req.request.method).toBe(HttpMethod.Get);
    });
  });
});
