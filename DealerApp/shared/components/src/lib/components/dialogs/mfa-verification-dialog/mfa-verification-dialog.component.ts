import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogComponent } from '@app/base';
import { User } from '@app/entities';
import { MobileVerificationRequest, UserFacade } from '@app/store/user';
import { MaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-mfa-verification-dialog',
  templateUrl: './mfa-verification-dialog.component.html',
  styleUrls: ['./mfa-verification-dialog.component.scss'],
  providers: [MaskPipe],
})
export class MfaVerificationDialogComponent extends BaseDialogComponent {
  @ViewChild('form', { static: false }) public override form: NgForm;
  isOtpSent$ = this.userFacade.isOtpSent$;
  code = '';
  component: { value: { code: string; }; };
  

  constructor(
    public override dialogRef: MatDialogRef<MfaVerificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userFacade: UserFacade,
    private maskPipe: MaskPipe
  ) {
    super();
  }

  sendOtp() {
    const phoneNumber = this.maskPipe.transform(this.data.mobilePhone, '(000) 000-0000');
    this.userFacade.sentOtp(phoneNumber);
  }

  verifyCode() {
    const phoneNumber = this.maskPipe.transform(this.data.mobilePhone, '(000) 000-0000');
    const isFormValid = this.form.valid;
    const data: MobileVerificationRequest = {
      otp: this.code,
      phoneNumber: phoneNumber,
      isModalHide: true,
    };
    if (isFormValid) {
      this.userFacade.verifyOtp(data);
    }
  }

  resetSentOtpEvent() {
    this.userFacade.resetSentOtpEvent();
  }
  closeWindow(): void {
    this.resetSentOtpEvent();
    this.close();
  }

}
