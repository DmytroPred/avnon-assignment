import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export function atLeastOneTrueValidator(
  control: AbstractControl
): ValidationErrors | null {
  const controls = (control as FormArray).controls;
  const hasTrue = controls.some((ctrl) => ctrl.value === true);
  return hasTrue ? null : { atLeastOneTrue: true };
}
