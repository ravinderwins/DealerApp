import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadFileDetails } from '@app/entities';

@Component({
  selector: 'app-uploaded-files',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.scss'],
})
export class UploadedFilesComponent {
  @Input() files: UploadFileDetails[];
  @Output() delete = new EventEmitter<UploadFileDetails[]>();

  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.delete.emit(this.files);
  }

  iconImage(name: string) {
    const fileExtention = name.split('.').pop();
    if (fileExtention === 'png' || fileExtention === 'jpg' || fileExtention === 'jpeg') return 'image';
    else if (fileExtention === 'pdf') return 'picture_as_pdf';
    else if (fileExtention === 'gif') return 'gif_box';
    return 'upload_file';
  }
}
