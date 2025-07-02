import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Injectable service that centralizes the data validation across all the application.
 * It helps to avoid code duplication and allows to easily change and maintain business rules more easily. */
@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public professionalIdFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim();
      const cipPattern = /^CIP\d{6}$/;
      const capPattern = /^CAP\d{6}$/;

      if (!value) return null;

      const isValid = cipPattern.test(value) || capPattern.test(value);

      return isValid ? null : { invalidProfessionalId: true };
    };
  }

  public phoneNumberFormat() {
    const E164_REGEX = /^\+[1-9]\d{7,14}$/;

    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || E164_REGEX.test(value)) {
        return null;
      }
      return { phoneFormat: 'Phone number must be in E.164 format (e.g., +1234567890)' };
    };
  }
}
