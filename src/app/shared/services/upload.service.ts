import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private afStorage: AngularFireStorage) {}

  uploadImage(path: string, blob: any) {
    const ref = this.afStorage.ref(`${path}/${Date.now() + 1}`);
    return ref
      .put(blob)
      .then((snapShot) => {
        return snapShot.ref.getDownloadURL().then((url) => {
          return url;
        });
      })
      .catch((err) => {
        return err;
      });
  }

  uploadImageBase64(path: string, data: string) {
    const ref = this.afStorage.ref(`${path}/${Date.now() + 1}`);
    return ref
      .putString(data, 'data_url')
      .then((snapShot) => {
        return snapShot.ref.getDownloadURL().then((url) => {
          return url;
        });
      })
      .catch((err) => {
        return err;
      });
  }
}
