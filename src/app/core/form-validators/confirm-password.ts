import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const fieldsMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (
    password?.valid &&
    confirmPassword?.valid &&
    password.value != confirmPassword.value
  ) {
    return { notSame: true };
  }

  return null;
};
