import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ROUTES } from 'src/app/constants/routes';
import { AuthService } from '../auth.service';
import { passwordWeak, passwordMatch } from '../auth.utils';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  actionCode!: string;
  showLogo = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      password: ['', { validators: [Validators.required, passwordWeak()] }],
      confirmPassword: [
        '',
        { validators: [Validators.required, passwordMatch('password')] },
      ],
    });

    this.route.paramMap.subscribe((params: any) => {
      this.actionCode = params.get('code');
    });
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  submit() {
    this.authService.confirmPasswordReset(
      this.actionCode,
      this.changePasswordForm.value.password
    );
  }
}
