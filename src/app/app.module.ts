import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/components/nav/nav.component';
import { AuthModule } from './modules/auth/auth.module';
import { MaterialModule } from './shared/material/material.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SideNavComponent } from './shared/components/side-nav/side-nav.component';
import { DropdownMenuComponent } from './shared/components/dropdown-menu/dropdown-menu.component';
import { CirclesComponent } from './shared/components/circles/circles.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { AuthService } from './modules/auth/auth.service';
import { ProfileModule } from './modules/profile/profile.module';
import { OffClickDirective } from './shared/directives/off-click.directive';
import { LoaderMainComponent } from './shared/components/loader-main/loader-main.component';
import { EmailVerifyComponent } from './shared/components/email-verify/email-verify.component';
import { ResultsModule } from './modules/results/results.module';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AboutModule } from './modules/about/about.module';
import { QuickStartComponent } from './modules/quick-start/quick-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    SideNavComponent,
    DropdownMenuComponent,
    CirclesComponent,
    PageNotFoundComponent,
    OffClickDirective,
    EmailVerifyComponent,
    QuickStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthModule,
    MaterialModule,
    ProfileModule,
    ResultsModule,
    AboutModule,
    ChartsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
