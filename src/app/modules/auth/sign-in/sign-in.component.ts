import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ROUTES } from '../../../constants/routes';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  submitted = false;
  isNotExist = false;
  invalidPassword = false;
  user!: User;
  ROUTES = ROUTES;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });
  }

  get f() {
    return this.signInForm.controls;
  }

  submit() {
    if (!this.signInForm.valid) {
      return;
    }
    this.submitted = true;
    this.user = this.signInForm.value;
    return this.authService
      .signIn(this.user)
      .then(() => {
        this.submitted = false;
        this.router.navigate([`${ROUTES.HOME_PAGE}`]);
      })
      .catch((error) => {
        this.submitted = false;
        if (error.message.includes('no user record')) {
          this.isNotExist = true;
        } else {
          this.invalidPassword = true;
        }
      });
  }
}
