import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './constants/routes';
import { HomeComponent } from './modules/home/home.component';
import { CustomEmailHandlerComponent } from './modules/custom-email-handler/custom-email-handler.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './modules/about/about.component';
import { QuickStartComponent } from './modules/quick-start/quick-start.component';

const routes: Routes = [
  {
    path: ROUTES.LANDING_PAGE,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    data: { showNav: false, showFooter: false },
  },
  {
    path: ROUTES.HOME_PAGE,
    component: HomeComponent,
    data: { showNav: true, showFooter: true },
  },
  {
    path: ROUTES.ABOUT_MIDO,
    loadChildren: () =>
      import('./modules/about/about.module').then((m) => m.AboutModule),
    data: { showNav: true, showFooter: true },
  },

  {
    path: ROUTES.CUSTOM_EMAIL,
    component: CustomEmailHandlerComponent,
    data: { showNav: false, showFooter: false },
  },
  {
    path: ROUTES.PROFILE_PAGE,
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
    data: { showNav: true, showFooter: false },
  },
  {
    path: ROUTES.RESULTS_PAGE,
    loadChildren: () =>
      import('./modules/results/results.module').then((m) => m.ResultsModule),
    canActivate: [AuthGuard],
    data: { showNav: true, showFooter: true },
  },
  {
    path: ROUTES.NEW_TEST_PAGE,
    loadChildren: () =>
      import('./modules/new-test/new-test.module').then((m) => m.NewTestModule),
    canActivate: [AuthGuard],
    data: { showNav: true, showFooter: true },
  },
  {
    path: ROUTES.QUICK_START,
    component: QuickStartComponent,
    data: { showNav: true, showFooter: true },
  },

  {
    path: ROUTES.PAGE_NOT_FOUND,
    component: PageNotFoundComponent,
    data: { showNav: true, showFooter: true },
  },
  { path: '**', redirectTo: `/${ROUTES.PAGE_NOT_FOUND}` },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
