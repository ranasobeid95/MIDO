import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROUTES } from 'src/app/constants/routes';
import { AuthService } from '../auth.service';
import { passwordMatch, passwordWeak } from '../auth.utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  ROUTES = ROUTES;
  error: string | null = null;
  loading: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required, passwordWeak()] }],
      confirmPassword: [
        '',
        { validators: [Validators.required, passwordMatch('password')] },
      ],
    });
  }

  onSubmit(form: any) {
    this.loading = true;
    this.authService
      .signup(form.value)
      .then((res) => {
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.error = err.errorMsg;
      });
  }

  get f() {
    return this.signupForm.controls;
  }
}
