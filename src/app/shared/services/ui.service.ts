import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  showVerifyChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {}

  openSuccessSnackBar(message: any, action: any) {
    this.snackbar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  openFailureSnackBar(message: any, action: any) {
    this.snackbar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['fail-snackbar'],
    });
  }
}
