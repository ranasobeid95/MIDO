import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ROUTES } from '../constants/routes';
import { AuthService } from '../modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  ROUTES = ROUTES;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isAuth$().pipe(
      map((isLog) => {
        if (isLog) {
          return true;
        }
        this.router.navigate([`/${ROUTES.LANDING_PAGE}`]);
        return false;
      })
    );
  }
}
