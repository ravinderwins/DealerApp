import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseFormComponent } from '@app/base';
import { ConfigItemType, UploadDocument, CustomerType, Option } from '@app/entities';
import { RxjsService, EventService } from '@app/shared/services';

@Component({
  selector: 'app-upload-docs-form',
  templateUrl: './upload-docs-form.component.html',
})
export class UploadDocsFormComponent extends BaseFormComponent implements OnInit, AfterViewInit {
  @ViewChild('form', { static: false }) public form: NgForm;
  readonly docType = ConfigItemType.DocType;
  @Input() uploadDocs = new UploadDocument();
  @Input() primaryCustomerName: string;
  @Input() secondaryCustomerName: string;
  @Input() type:CustomerType;
  @Output() dataChanged = new EventEmitter<object>();
  uploadForm: UploadDocument;
  customerName: Option[] = [];

  constructor(public override rxjsService: RxjsService, public override eventService: EventService) {
    super(eventService, rxjsService);
  }

  ngOnInit() {
    this.uploadForm = { ...this.uploadDocs };
    this.setCustomerDetails();
  }

  ngAfterViewInit(): void {
    this.registerFormValueChange();
  }

  setCustomerDetails() {
    if (this.type !== CustomerType.Business) this.customerName.push({ text: this.primaryCustomerName, value: this.primaryCustomerName });
    if (this.secondaryCustomerName) this.customerName.push({ text: this.secondaryCustomerName, value: this.secondaryCustomerName });
  }

  override formValuesChanged() {
    const formValue = { ...this.uploadForm };
    this.dataChanged.emit(formValue);
  }
}
