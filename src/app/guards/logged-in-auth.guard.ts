import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROUTES } from '../../app/constants/routes';
import { AuthService } from '../modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard implements CanActivate {
  ROUTES = ROUTES;
  isAuth: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuth$().pipe(
      map((isLog) => {
        if (isLog) {
          this.router.navigate([`/${ROUTES.HOME_PAGE}`]);
          return false;
        }

        return true;
      })
    );
  }
}
