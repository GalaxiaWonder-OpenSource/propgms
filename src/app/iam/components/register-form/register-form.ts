import {Component, EventEmitter, inject, Output} from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';
import {UserAccountType} from '../../model/user-account-type';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {ValidatorsService} from '../../../shared/services/validator-service';
import {Person} from '../../model/person';
import {UserAccount} from '../../model/user-account';
import {Specialty} from '../../../public/model/specialty';


@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.html',
  styleUrl: 'register-form.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
    MatCardModule
  ]
})
/** Form to allow a user to register a personal user account and their personal data. */
export class RegisterForm {

  /** Injected service to build to manage the form. */
  private fb = inject(FormBuilder);

  /** Injected service to build to call validator methods for form fields. */
  private validator = inject(ValidatorsService);

  /** Declaring the UserAccountType enum as a usable variable.
   * This way, it can be called from the HTML template. */
  protected readonly UserAccountType = UserAccountType;

  /** Declaring the enum values as part of an array.
   * This way, the values can be iterated and called more easily on the select field. */
  protected readonly accountTypes = Object.values(UserAccountType);

  /** Declaring the enum values as part of an array.
   * This way, the values can be iterated and called more easily on the select field. */
  protected readonly specialties = Object.values(Specialty);

  /** Value to control whether the form is linear.
   * Due to product design it should stay linear.  */
  protected readonly isLinear = true;

  /** Form group to store the values of the account to be registered. */
  accountFormGroup: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    type: [null, Validators.required]
  });

  /** Form group to store the values of the personal information of the account's owner. */
  personalFormGroup: FormGroup = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [this.validator.phoneNumberFormat()]],
    professionalId: [''],
    specialty: [null]
  });

  /** Event that emits the data of the form using the {@link Person} and {@link UserAccount} resources. */
  @Output() registerSubmit = new EventEmitter<{ person: Person; account: UserAccount }>();

  /** Emits the directive to move into the login tab. */
  @Output() redirectToLogin = new EventEmitter<void>();

  /** Method called upon clicking the 'Register' button.
   * It calls both validation form groups and emits the event if the data meets the validation criteria. */
  submit() {
    if (this.personalFormGroup.valid && this.accountFormGroup.valid) {
      this.registerSubmit.emit({
        person: this.personalFormGroup.value,
        account: this.accountFormGroup.value
      });
    } else {
      this.personalFormGroup.markAllAsTouched();
      this.accountFormGroup.markAllAsTouched();
    }
  }

  triggerLoginRedirect() {
    this.redirectToLogin.emit();
  }

  /** Utility method that changes the {@linkcode personalFormGroup} validation behavior.
   * It's called everytime the step section from the component changes.
   * If {@link UserAccountType.TYPE_WORKER} is selected on the form then the ProfessionalId will become required. */
  onStepChange(event: StepperSelectionEvent) {
    const typeValue = this.accountFormGroup.get('type')?.value;
    const professionalIdControl = this.personalFormGroup.get('professionalId');
    const specialtyControl = this.personalFormGroup.get('specialty');

    if (typeValue === UserAccountType.TYPE_WORKER) {
      professionalIdControl?.setValidators([
        Validators.required,
        this.validator.professionalIdFormat()
      ]);
      specialtyControl?.setValidators([Validators.required]);
    } else {
      professionalIdControl?.clearValidators();
      specialtyControl?.clearValidators();
    }
    professionalIdControl?.updateValueAndValidity();
    specialtyControl?.updateValueAndValidity();
  }
}
