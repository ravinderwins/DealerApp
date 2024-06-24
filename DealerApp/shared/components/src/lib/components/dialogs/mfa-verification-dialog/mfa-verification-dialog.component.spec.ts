import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@app/shared/pipes';
import { MockUserFacade, UserFacade } from '@app/store/user';
import { NgxMaskModule } from 'ngx-mask';
import { MfaVerificationDialogComponent } from './mfa-verification-dialog.component';

describe('MfaVerificationDialogComponent', () => {
  let component: MfaVerificationDialogComponent;
  let fixture: ComponentFixture<MfaVerificationDialogComponent>;
  let userFacade: UserFacade;
  const mockData = {
    mobilePhone: '(913) 413-6977',
  };
  const mockForm : any = {
    valid:true,
    dirty:false,
    code:'123456'
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MfaVerificationDialogComponent],
      imports: [ TranslateModule.forRoot({}), PipesModule,FormsModule,
        NgxMaskModule.forRoot()],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        {
          provide: UserFacade,
          useValue: MockUserFacade
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MfaVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userFacade = TestBed.inject(UserFacade);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });

  it('should handle sentOtp with dialogRef', () => {
    
    const mockSpy = jest.spyOn(userFacade, 'sentOtp');
    component.sendOtp();
    expect(mockSpy).toHaveBeenCalledWith(mockData.mobilePhone);
  });

  it('should handle verifyCode with dialogRef', () => {
    component.form = mockForm;
    component.code  = '123456';
    const mockSpy = jest.spyOn(userFacade, 'verifyOtp');
    component.verifyCode();
    expect(mockSpy).toHaveBeenCalled();
  });
});
