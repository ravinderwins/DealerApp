import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerType, UploadDocument, UploadFileDetails } from '@app/entities';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-uploaded-documents',
  templateUrl: './uploaded-documents.component.html',
  styleUrls: ['./uploaded-documents.component.scss']
})
export class UploadedDocumentsComponent implements OnInit {

  @Input() files$: Observable<UploadFileDetails[]>;
  @Input() customerType$: Observable<CustomerType>;
  @Input() primaryCustomerName$:Observable<string>;
  @Input() secondaryCustomerName$: Observable<string>;
  
  readonly uploadDocs = new UploadDocument();

  @Output() updateDocsDetails = new EventEmitter<object>();
  @Output() uploadedFiles = new EventEmitter<object>();
  @Output() updateDocs = new EventEmitter<object>();
  @Output() cancel = new EventEmitter<void>();
  @Output() uploadDocsDetails = new EventEmitter<void>();

  ngOnInit(): void {
    this.updateDocsDetails.emit(this.uploadDocs)
  }

  dataChanged(event){
    this.updateDocs.emit(event);
  }

  updateFiles(event){
    this.uploadedFiles.emit(event);
  }

  formValueChanged(event){
    this.updateDocsDetails.emit(event);
  }
  
}
