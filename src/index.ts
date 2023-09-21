import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';
import {CustomFormValidationErrors} from './app/utilities/validators/form-validators';

export function collectAllFormErrors(formGroup?: FormGroup): CustomFormValidationErrors[] {
  if (!formGroup) {
    return [];
  }
  const errorsFromControls = getControlsFromFormGroup(formGroup)
    .map(control => getErrorsFromControl(control))
    .reduce((acc, arr) => [...acc, ...arr], []);
  const errorsFromGroup = getErrorsFromGroup(formGroup);
  // In case of cross-field validation we have errors on the group itself, these need to be added, too
  return [...errorsFromControls, ...errorsFromGroup];
}

function getErrorsFromGroup(formGroup: FormGroup): CustomFormValidationErrors[] {
  const errors: ValidationErrors | null = formGroup.errors;
  if (!errors) {
    return [];
  }
  const keys = Object.keys(errors);
  return keys.map(key => errors[key]);
}

function getErrorsFromControl(control: AbstractControl): CustomFormValidationErrors[] {
  if (control === null || control.errors === null) {
    return [];
  }
  const errors: ValidationErrors = control.errors;
  const keys = Object.keys(control.errors);
  return keys.map(key => errors[key]);
}

function getControlsFromFormGroup(formGroup: FormGroup): AbstractControl[] {
  return Object.keys(formGroup.controls).map(key => formGroup.controls[key]);
}

