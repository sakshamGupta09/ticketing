import { AbstractControl, ValidationErrors } from '@angular/forms';

function noSpaceValidator(control: AbstractControl): ValidationErrors | null {
  if (control.value && control.value.includes(' ')) {
    return { hasSpaces: true };
  }
  return null;
}

export default noSpaceValidator;
