import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firebaseConfig } from 'firebase-config';
import { ROUTES } from 'src/app/constants/routes';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-custom-email-handler',
  templateUrl: './custom-email-handler.component.html',
  styleUrls: ['./custom-email-handler.component.scss'],
})
export class CustomEmailHandlerComponent implements OnInit {
  mode: string = '';
  actionCode: string = '';
  continueUrl: string = '';
  config = {
    apiKey: firebaseConfig.apiKey,
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mode = this.route.snapshot.queryParams['mode'];
    this.actionCode = this.route.snapshot.queryParams['oobCode'];
    this.handleContentLoaded();
  }

  handleContentLoaded() {
    switch (this.mode) {
      case 'resetPassword':
        this.router.navigate([`/${ROUTES.RESET_PASSWORD}`, this.actionCode]);

        // Display reset password handler and UI.
        // this.authService.handleResetPassword(actionCode);
        break;
      case 'verifyEmail':
        this.authService.handleVerifyEmail(this.actionCode);
        break;
      default:
      // Error: invalid mode.
    }
  }
}
