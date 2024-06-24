import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  set(key: string, data: any, isSession: boolean = false) {
    if (isSession) sessionStorage.setItem(key, data);
    else localStorage.setItem(key, data);
  }

  get(key: string, isSession: boolean = false) {
    return isSession ? sessionStorage.getItem(key) : localStorage.getItem(key);
  }

  remove(key: string, isSession: boolean = false) {
    isSession ? sessionStorage.removeItem(key): localStorage.removeItem(key);
  }

  clear(isSession: boolean = false) {
    isSession ? sessionStorage.clear(): localStorage.clear();
  }
}
