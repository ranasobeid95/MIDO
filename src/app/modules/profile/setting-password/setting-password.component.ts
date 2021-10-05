import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/constants/routes';
import { UiService } from 'src/app/shared/services/ui.service';
import { AuthService } from '../../auth/auth.service';
import { passwordMatch, passwordWeak } from '../../auth/auth.utils';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-setting-password',
  templateUrl: './setting-password.component.html',
  styleUrls: ['./setting-password.component.scss'],
})
export class SettingPasswordComponent implements OnInit {
  passwordForm!: FormGroup;
  loading: boolean = false;
  error: string | null = null;
  showPopup: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      currentPassword: [
        '',
        { validators: [Validators.required, passwordWeak()] },
      ],
      newPassword: ['', { validators: [Validators.required, passwordWeak()] }],
      confirmPassword: [
        '',
        { validators: [Validators.required, passwordMatch('newPassword')] },
      ],
    });
  }

  onSubmit() {
    this.loading = true;
    let values = this.passwordForm.value;

    this.profileService
      .changePassword(values.newPassword)
      .then(() => {
        this.loading = false;
        this.resetForm();
        this.uiService.openSuccessSnackBar(
          'Change Password Successfully',
          'Ok'
        );
        this.router.navigate([ROUTES.PROFILE_PAGE]);
      })
      .catch((err: any) => {
        this.loading = false;

        // handle Errors
        if (err.code === 'auth/requires-recent-login') {
          this.showPopup = true;
        } else {
          this.resetForm();
          this.uiService.openFailureSnackBar(
            'Change Password Failed ',
            'Try again!!'
          );
        }
      });
  }

  resetForm() {
    let controls = this.passwordForm.controls;
    Object.keys(controls).forEach((key) => {
      controls[key].markAsUntouched();
      controls[key].setValue('');
    });
  }

  get f() {
    return this.passwordForm.controls;
  }

  onLogout() {
    this.authService.signout();
  }
}
