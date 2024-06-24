import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Signature } from '@app/entities';
@Component({
  selector: 'app-signature-control',
  templateUrl: './signature-control.component.html',
  styleUrls: ['./signature-control.component.scss'],
})
export class SignatureControlComponent {
  showDrawSignature = true;

  @Input() submitted = false;
  @Input() label: string;
  @Input() width: number;
  @Input() placeholder: string;
  @Input() customerName: string;
  @Input() name: string;
  @Input() signatureName: string;
  @Input() maxlength: number;
  @Input() required: boolean;
  @Input() disabled = false;

  @Output() signatureBase64 = new EventEmitter<Signature>();

  changeType(value: boolean) {
    this.showDrawSignature = value;
    const data: Signature = {
      signatureBase64: null,
    };
    this.signatureBase64.emit(data);
  }

  emitSignature(data: Signature, sign = false) {
    const { signatureBase64 } = data;
    data.signatureBase64 = signatureBase64 ? signatureBase64.split(',')[1] : null;
    if (sign) data.name = this.customerName;
    this.signatureBase64.emit(data);
  }
}
