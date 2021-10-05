import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';

import { ROUTES } from '../../constants/routes';
import { SignInComponent } from './sign-in/sign-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoggedInAuthGuard } from 'src/app/guards/logged-in-auth.guard';

const routes: Routes = [
  {
    path: ROUTES.LANDING_PAGE,
    component: LandingComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: ROUTES.SIGN_UP,
    component: SignupComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: ROUTES.SIGN_IN,
    component: SignInComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: ROUTES.RESET_PASSWORD,
    component: ResetPasswordComponent,
  },
  {
    path: `${ROUTES.RESET_PASSWORD}/:code`,
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
