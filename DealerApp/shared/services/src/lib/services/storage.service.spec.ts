import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

const categoryData = [
  {
    name: 'stateVehicale',
  },
];
describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  it('should handle set with isSession true', () => {
    const key = 'Vehicale Category';
    const data = categoryData;
    const isSession = true;
    service.set(key, data, isSession);
  });
  it('should handle set with isSession false', () => {
    const key = 'Vehicale Category';
    const data = categoryData;
    const isSession = false;
    service.set(key, data, isSession);
  });

  it('should handle get with isSession true', () => {
    const key = 'Vehicale Category';
    const isSession = true;
    service.get(key, isSession);
  });
  it('should handle get with isSession false', () => {
    const key = 'Vehicale Category';
    const isSession = false;
    service.get(key, isSession);
  });

  it('should handle remove with isSession true', () => {
    const key = 'Vehicale Category';
    const isSession = true;
    service.remove(key, isSession);
  });
  it('should handle remove with isSession false', () => {
    const key = 'Vehicale Category';
    const isSession = false;
    service.remove(key, isSession);
  });

  it('should handle clear with isSession true', () => {
    const isSession = true;
    service.clear(isSession);
  });
  it('should handle clear with isSession false', () => {
    const isSession = false;
    service.clear( isSession);
  });
  
});
