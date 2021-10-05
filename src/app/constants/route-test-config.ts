import { AuthGuard } from '../guards/auth.guard';
import { CustomEmailHandlerComponent } from '../modules/custom-email-handler/custom-email-handler.component';
import { HomeComponent } from '../modules/home/home.component';
import { PageNotFoundComponent } from '../modules/page-not-found/page-not-found.component';
import { ROUTES } from './routes';

export const routes = [
  {
    path: ROUTES.LANDING_PAGE,
    loadChildren: () =>
      import('../modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: ROUTES.HOME_PAGE,
    component: HomeComponent,
  },

  {
    path: ROUTES.CUSTOM_EMAIL,
    component: CustomEmailHandlerComponent,
  },
  {
    path: ROUTES.PROFILE_PAGE,
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: ROUTES.RESULTS_PAGE,
    loadChildren: () =>
      import('../modules/results/results.module').then((m) => m.ResultsModule),
    canActivate: [AuthGuard],
  },
  {
    path: ROUTES.NEW_TEST_PAGE,
    loadChildren: () =>
      import('../modules/new-test/new-test.module').then(
        (m) => m.NewTestModule
      ),
    canActivate: [AuthGuard],
  },

  { path: ROUTES.PAGE_NOT_FOUND, component: PageNotFoundComponent },
  { path: '**', redirectTo: `/${ROUTES.PAGE_NOT_FOUND}` },
];
