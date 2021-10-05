import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { ProfileService } from 'src/app/modules/profile/profile.service';
import { UiService } from '../../services/ui.service';
import { UploadService } from '../../services/upload.service';
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss'],
})
export class CropImageComponent implements OnInit {
  @Input() inputEvent: any = '';
  @Output() closedCropChanged = new EventEmitter();
  imageChangedEvent: any = '';
  loading: boolean = true;
  submitLoading!: boolean;
  croppedImage: any;

  constructor(
    private uiService: UiService,
    private uploadService: UploadService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.loading = true;
  }

  cropperReady() {
    this.loading = false;
  }

  loadImageFailed() {
    this.loading = false;
    this.closedCropChanged.emit();
    this.uiService.openFailureSnackBar('Invalid Image type!!', 'Try Again');
  }

  closeCrop() {
    this.closedCropChanged.emit();
  }

  async submitPhoto() {
    this.submitLoading = true;
    try {
      const url = await this.uploadService.uploadImageBase64(
        'users',
        this.croppedImage
      );

      const userData: any = { profilePhoto: url };
      await this.profileService.updateUserData(userData);

      await this.authService.updateUserAuth({ photoURL: url });

      this.submitLoading = false;

      this.uiService.openSuccessSnackBar(
        'Your profile picture has been updated!!',
        'Ok'
      );

      this.closedCropChanged.emit();
    } catch (err) {
      this.submitLoading = false;

      this.uiService.openFailureSnackBar(
        'Your profile picture has failed update!!',
        'Try Again'
      );

      this.closedCropChanged.emit();
    }
  }
}
