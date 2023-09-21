import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';

export const CustomFormValidators = {
  maxLengthValidator,
  minLengthValidator,
  containsWhiteSpaceValidator,
  containsSemicolonValidator,
  containsCommaValidator,
  alreadyExistsValidator,
  exceedMaximumLengthOfAllItemsValidator,
  maxValueValidator,
};
function maxValueValidator(fieldName: string,maxValue: number): ValidatorFn {
  return inputStringValidator(Validators.max(maxValue), fieldName,
    `${fieldName}.MAX_VALUE`);
}

function maxLengthValidator(fieldName: string,maxLength: number): ValidatorFn {
  return inputStringValidator(Validators.maxLength(maxLength), 'maxLength',
    `${fieldName}.MAX_LENGTH_VALUE`);
}

function minLengthValidator(fieldName: string,minLength: number): ValidatorFn {
  return inputStringValidator(Validators.minLength(minLength), 'minLength',
    `${fieldName}.MIN_LENGTH_VALUE`);
}

function containsWhiteSpaceValidator(fieldName: string): ValidatorFn {
  return inputStringValidator(control => {
      return control.value.trim().indexOf(' ') !== -1 ? {error: `${control.value} `} : null;
    }, 'allowedIpAddress',
    `${fieldName}.CANT_CONTAINS_SPACE`);
}

function containsSemicolonValidator(fieldName: string): ValidatorFn {
  return inputStringValidator(control => {
      return control.value.includes(';') ? {error: `${control.value} `} : null;
    }, 'allowedIpAddress',
    `${fieldName}.CANT_CONTAINS_SEMICOLON`);
}

function containsCommaValidator(fieldName: string): ValidatorFn {
  return inputStringValidator(control => {
      return control.value.includes(',') ? {error: `${control.value} `} : null;
    }, 'allowedIpAddress',
    `${fieldName}.CANT_CONTAINS_COMMA`);
}

function alreadyExistsValidator(fieldName: string, listOfString: string[]): ValidatorFn {
  return inputStringValidator(control => {
      return listOfString.includes(control.value.trim()) ? {error: `${control.value}`} : null;
    }, 'allowedIpAddress',
    `${fieldName}.ALREADY_EXISTS`);
}

function exceedMaximumLengthOfAllItemsValidator(fieldName: string, previousMaxLengthOfAll: number, allowedMaxLengthOfAll: number): ValidatorFn {
  return inputStringValidator(control => {
      return previousMaxLengthOfAll + control.value.length + 1 > allowedMaxLengthOfAll ? {error: `${control.value}`} : null;
    }, 'allowedIpAddress',
    `${fieldName}.EXCEEDED_MAX_LENGTH_OF_ALL`);
}

function inputStringValidator(validatorFn: ValidatorFn, validatorName: string, message: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const errorObject = validatorFn(control);
    if (errorObject !== null) {
      return {
        [validatorName]: {
          message
        }
      };
    } else {
      return null;
    }
  };
}
export interface CustomFormValidationErrors {
  message: string;
}
