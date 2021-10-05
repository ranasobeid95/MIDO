import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROUTES } from 'src/app/constants/routes';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  ROUTES = ROUTES;
  showLogo = false;
  linkSended = false;
  isNotExist = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
    });
  }

  get f() {
    return this.resetPasswordForm;
  }

  submit() {
    return this.authService
      .resetPassword(this.resetPasswordForm.value.email)
      .then(() => {
        this.linkSended = true;
      })
      .catch((error) => {
        if (error.message.includes('no user record')) {
          this.linkSended = false;
          this.isNotExist = true;
        }
      });
  }
}
