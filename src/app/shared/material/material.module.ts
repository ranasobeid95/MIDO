import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  ShoppingIcon,
} from 'src/assets/icons';
import { MatNativeDateModule } from '@angular/material/core';

import { MatCardModule } from '@angular/material/card';

const Mat_Module = [
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatCardModule,
];

@NgModule({
  declarations: [],
  imports: [...Mat_Module],
  exports: [...Mat_Module],
  providers: [MatDatepickerModule],
})
export class MaterialModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      'twitter',
      this.domSanitzer.bypassSecurityTrustHtml(TwitterIcon)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'linked_in',
      this.domSanitzer.bypassSecurityTrustHtml(LinkedinIcon)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'Instagram',
      this.domSanitzer.bypassSecurityTrustHtml(InstagramIcon)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'faceicon',
      this.domSanitzer.bypassSecurityTrustHtml(FacebookIcon)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'shopping_icon',
      this.domSanitzer.bypassSecurityTrustHtml(ShoppingIcon)
    );
  }
}
