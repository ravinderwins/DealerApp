import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { SnackbarData } from '../models';
import { SnackbarService } from './snackbar.service';
import { SnackbarComponent } from '../components';
describe('SnackbarService', () => {
  let service: SnackbarService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule, CommonModule, TranslateModule.forRoot({})],
      declarations:[SnackbarComponent],
      providers: [
        SnackbarService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(SnackbarService);
  });
  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  it('should be success', () => {
    const message = 'Successfully done!';
    service.success(message);
  });

  it('should be warning', () => {
    const messageWarning = 'Warning';
    service.warning(messageWarning);
  });
  describe('should be error', () => {
    const messageError = 'Something went wrong';
    it('should be error with message', () => {
      service.error(messageError);
    });
    it('should be error with networkError true', () => {
      service.error(messageError, -1, '', true);
    });
    it('should be error with 400 status', () => {
      service.error(messageError, 400);
    });
    it('should be error with 500 status', () => {
      service.error(messageError, 500);
    });
    it('should be error with 504 status', () => {
      service.error(messageError, 504);
    });
  });

  it('should be multiple errors', () => {
    const data: SnackbarData = {
      traceId: '',
      title: '',
      message: 'Something went wrong',
      status: 400,
      messageGroups: [{titleKey: 'Validation Error', messages: ['']}],
    };
    service.multipleErrors(data);
  });
 
  it('should be multiple warnings', () => {
    const data: SnackbarData = {
      traceId: '',
      title: '',
      message: 'Something went wrong',
      status: 400,
      messageGroups: [{titleKey: 'Date should be valid', messages: ['']}],
    };
    service.multipleWarnings(data);
  });

  it('dismiss method is called', () => {
    jest.spyOn(service, 'dismiss');
    service.dismiss();
  });

});
