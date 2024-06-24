import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { UploadFileDetails } from '@app/entities';

@Component({
  selector: 'app-upload-camera-docs',
  templateUrl: './upload-camera-docs.component.html',
  styleUrls: ['./upload-camera-docs.component.scss'],
})
export class UploadCameraDocsComponent implements OnDestroy {
  @ViewChild('fileDropRef') fileDropRef;
  @ViewChild('video') video: ElementRef;
  @ViewChild('picture') picture: ElementRef;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

  videoElement: HTMLVideoElement;
  canvasElement: HTMLCanvasElement;
  isEnableCamera = false;
  isAllowCamera = false;
  @Input() multiple = false;
  @Output() upload = new EventEmitter<UploadFileDetails>();

  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  prepareFilesList(files) {
    if (this.multiple) this.upload.emit(files);
    else this.upload.emit(files[0]);
  }

  browserForFile(value, event) {
    if (value) this.takePicture(event);
    else this.enableCamera(event);
  }

  enableCamera(event) {
    this.isEnableCamera = true;
    this.isAllowCamera = false;
    this.videoElement = this.video.nativeElement;
    navigator.mediaDevices
      ?.getUserMedia({
        video: { facingMode: 'environment' },
      })
      .then((stream) => {
        this.videoElement.srcObject = stream;
        this.scroll(event);
      })
      .catch((_err) => {
        this.isEnableCamera = false;
        this.isAllowCamera = true;
      });
  }

  scroll(el: HTMLElement) {
    el.scrollTo(0, el.scrollHeight);
    el.scrollIntoView();
  }

  takePicture(event) {
    this.isEnableCamera = false;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.height = 1320;
    this.canvasElement.width = 1920;
    const context = this.canvasElement.getContext('2d');
    context.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
    const image = this.canvasElement.toDataURL('image/png');
    const file = this.base64ImageToBlob(image);
    const imageFile = new File([file], this.generateString(), { type: 'image/png' });
    this.prepareFileIcon([imageFile]);
    this.stopCamera();
    this.scroll(event);
  }

  prepareFileIcon(files) {
    if (files && files[0]) {
      const numberOfFiles = files.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          files[i].imageUrl = e.target.result;
          this.prepareFilesList(files);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  generateString() {
    const characters = 'Image';
    const number = Math.floor(Math.random() * 1000 + 1);
    return characters + '_' + number + '.png';
  }

  base64ImageToBlob(str) {
    const pos = str.indexOf(';base64,');
    const type = str.substring(5, pos);
    const base64 = str.substr(pos + 8);
    const imageContent = window.atob(base64);
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);
    for (let n = 0; n < imageContent.length; n++) {
      view[n] = imageContent.charCodeAt(n);
    }
    const blob = new Blob([buffer], { type: type });
    return blob;
  }

  stopCamera() {
    const video = document.getElementById('video') as HTMLVideoElement;
    const tracks = (<MediaStream>video?.srcObject)?.getTracks();
    tracks?.forEach((track) => track?.stop());
    this.isEnableCamera = false;
  }

  get takePictureLabel() {
    return this.isEnableCamera ? 'deal.docs.uploadedDocuments.capture' : 'deal.docs.uploadedDocuments.takePicture';
  }

  ngOnDestroy() {
    this.stopCamera();
  }
}
