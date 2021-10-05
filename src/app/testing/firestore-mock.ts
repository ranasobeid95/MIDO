import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirestoreMock {
  doc(id: any) {
    return {
      set: (_d: any) => new Promise((resolve, _reject) => resolve(true)),
    };
  }
}
