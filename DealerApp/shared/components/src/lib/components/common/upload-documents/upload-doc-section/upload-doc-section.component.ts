import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadFileDetails } from '@app/entities';

@Component({
  selector: 'app-upload-doc-section',
  templateUrl: './upload-doc-section.component.html',
  styleUrls: ['./upload-doc-section.component.scss'],
})
export class UploadDocSectionComponent {
  @Input() files: UploadFileDetails[];
  @Output() dataChanged = new EventEmitter<File[]>();
  @Output() updateFiles = new EventEmitter<UploadFileDetails[]>();

  isActiveUsersListView = true;

  uploadDoc(files) {
    this.dataChanged.emit(files);
  }

  tabChange(activeUsersView: boolean) {
    this.isActiveUsersListView = activeUsersView;
  }

  deleteDoc(payload: UploadFileDetails[]) {
    this.updateFiles.emit(payload);
  }
}
