import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ROUTES } from 'src/app/constants/routes';
import { User } from 'src/app/models/user';
import { UiService } from 'src/app/shared/services/ui.service';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from '../profile.service';

const mainGoals = [
  'Gain better understanding of my current health',
  'Improve/monitor my diet',
  'Lose weight',
  'Monitor my kidney-health',
  'Monitor my liver-health',
  'Monitor my hydration',
  `Nothing in particular, I'm just curious`,
  'Other',
];

const DIET_OF_CHOICE = [
  'I eat everything!',
  'Vegan',
  'Vegetarian',
  'Ketogenic',
  'Calorie Restriction (e.g. fasting)',
  'Mostly vegetarian',
  'Mostly vegan',
  'Alkaline',
  'High-protein diet',
  'Other',
];
@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.component.html',
  styleUrls: ['./setting-account.component.scss'],
})
export class SettingAccountComponent implements OnInit, OnDestroy {
  mainGoals = mainGoals;
  DIET_OF_CHOICE = DIET_OF_CHOICE;
  accountForm!: FormGroup;
  imageSrc!: any;
  imageBlob!: Blob;
  userInfo: User | any = null;
  loading: boolean = false;
  defaultImage = '../../../../assets/images/bear.jpg';
  /**
   * @valuesChanged  @isValuesChanged  @originalValues
   * All Of these properties to handle disable submit Buttons
   */
  valuesChanged = new BehaviorSubject<User | {}>({});
  isValuesChanged: boolean = false;
  originalValues: any = null; // to store default values To detect changes later
  showCrop: boolean = false;
  imageEvent: any;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private uiService: UiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setFormGroup();

    this.profileService
      .getUserData()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        this.userInfo = res;
        this.setValuesToForms();
      });

    // update fields based on firebase | when reload page
    this.valuesChanged
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res: any) => {
        if (res) {
          if (Object.keys(res).length < 1) {
            this.isValuesChanged = false;
          } else {
            this.isValuesChanged = true;
          }
        }
      });

    // Detect changes in accountForm to prevent send with no changes
    this.accountForm.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((values) => {
        this.detectChanges(values);
      });
  }

  setFormGroup() {
    this.accountForm = this.fb.group({
      firstName: ['', { validators: [Validators.required] }],
      lastName: ['', { validators: [Validators.required] }],
      dateOfBirth: [''],
      gender: [''],
      healthGoal: [''],
      diet: [''],
      height: [''],
      weight: [''],
    });
  }

  showBrowser(el: any) {
    el.click();
  }

  onChangeImage(event: any) {
    this.showCrop = true;
    this.imageEvent = event;
  }

  onClosedCrop(input: HTMLInputElement) {
    input.value = '';
    this.showCrop = false;
  }

  onSelectValue(value: any, key: string) {
    this.accountForm.controls[key].setValue(value);
  }

  async onSubmit() {
    this.loading = true;

    let data: any = { ...this.valuesChanged.value };

    // insert modifiedDate into values
    let newDate = new Date(Date.now()).toString();
    if (this.userInfo['modifiedDate']) {
      data['modifiedDate'] = [...this.userInfo['modifiedDate'], newDate];
    } else {
      data['modifiedDate'] = [newDate];
    }

    // update document for user and show a message
    this.profileService
      .updateUserData(data)
      .then(async () => {
        this.loading = false;

        if (data['firstName'] || data['lastName']) {
          const displayName =
            this.accountForm.value['firstName'] +
            ' ' +
            this.accountForm.value['lastName'];

          await this.authService.updateUserAuth({ displayName });
        }

        this.resetForm();
        this.uiService.openSuccessSnackBar(
          'Update your Profile Successfully',
          'Ok'
        );

        this.router.navigate([ROUTES.PROFILE_PAGE]);
      })
      .catch((err) => {
        this.loading = false;
        this.resetForm();
        this.uiService.openFailureSnackBar(
          'Update Profile Failed ',
          'Try again!!'
        );
      });
  }

  resetForm() {
    this.valuesChanged.next({});
    const form = this.accountForm.controls;
    Object.keys(form).forEach((key) => {
      form[key].markAsUntouched();
    });
  }

  detectChanges(newValues: any) {
    let valuesChange: any = {};
    if (this.originalValues) {
      Object.keys(newValues).forEach((key) => {
        if (newValues[key] !== this.originalValues[key]) {
          valuesChange[key] = newValues[key];
        }
      });
    }

    this.valuesChanged.next(valuesChange);
  }

  // This function to set values into Form based on firebase
  setValuesToForms() {
    this.imageSrc = this.userInfo.profilePhoto || this.defaultImage;

    if (this.userInfo) {
      Object.keys(this.accountForm.value).forEach((key) => {
        let value = this.userInfo[key] || '';
        if (key === 'dateOfBirth') {
          value = new Date(`${this.userInfo?.dateOfBirth}`);
        }
        this.accountForm.get(key)?.setValue(value);
      });

      this.resetForm(); // to restForm to disable submit button
      // save original values
      this.originalValues = { ...this.accountForm.value };
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
