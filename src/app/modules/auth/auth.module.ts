import { NgModule } from '@angular/core';

import { LandingComponent } from './landing/landing.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    LandingComponent,
    SignupComponent,
    AuthContainerComponent,
    SignInComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
  ],
  providers: [],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
