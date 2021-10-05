import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  @Output() imgBlobEvent = new EventEmitter<Blob | null>();
  loading: boolean = false;
  imgUrl: any | null = null;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  async handleChangeImage(event: any) {
    this.loading = true;
    const files = event.target.files;

    if (files && files[0]) {
      const link = URL.createObjectURL(files[0]);

      const response = await fetch(link);
      const data = await response.blob();
      const cleanLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
      this.imgUrl = cleanLink;
      this.loading = false;
      this.imgBlobEvent.emit(data);
    }

    //
  }
}
