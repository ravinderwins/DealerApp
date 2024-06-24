import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UploadFileDetails } from '@app/entities';

@Component({
  selector: 'app-upload-docs',
  templateUrl: './upload-docs.component.html',
  styleUrls: ['./upload-docs.component.scss'],
})
export class UploadDocsComponent {
  @ViewChild('fileDropRef') fileDropRef;
  @Input() multiple = false;
  @Output() upload = new EventEmitter<UploadFileDetails>();

  readonly fileTypes = '.png, .jpg, .jpeg, .heic, .gif, .tiff, .pdf';

  onFileDropped(data) {
    this.prepareFilesList(data);
  }

  fileBrowseHandler(event) {
    this.prepareFilesList(event.target.files);
    this.fileDropRef.nativeElement.value = '';
  }

  prepareFilesList(files) {
    if (this.multiple) {
      this.upload.emit(files);
    }else {
      this.upload.emit(files.length > 0 ? files[0] : null);
    }
  }
}
