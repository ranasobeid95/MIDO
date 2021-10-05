import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function passwordWeak(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let isWeak = true;
    const value = control.value;
    if (
      control.value.length >= 6 &&
      /\d/.test(value) &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value)
    ) {
      isWeak = false;
    }

    return isWeak ? { passwordWeak: { value: control.value } } : null;
  };
}

export function passwordMatch(key: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = control.root.get(key)?.value;

    return pass !== control.value
      ? { passwordMatch: { value: control.value } }
      : null;
  };
}
