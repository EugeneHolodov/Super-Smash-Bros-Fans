import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'bot-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  @Input() requiredFileType: string = '';
  @Output() fileSelected = new EventEmitter<File>();

  fileName: string = '';
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;

  constructor() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file: File = input.files[0];
    this.fileName = file.name;
    this.fileSelected.emit(file);
  }

  cancelUpload(): void {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
      this.reset();
    }
  }

  reset(): void {
    this.uploadProgress = null;
    this.uploadSub = null;
    this.fileName = '';
  }
}
