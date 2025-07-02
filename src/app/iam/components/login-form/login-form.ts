import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';

import { UserAccount } from '../../model/user-account';

@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.html',
  styleUrl: 'login-form.css',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
    MatCardModule
  ]
})
export class LoginForm {
  private fb = inject(FormBuilder);

  /** Reactive form with only the fields required for login. */
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  /** Emits the form values as a UserAccount model on submission. */
  @Output() loginSubmit = new EventEmitter<UserAccount>();

  /** Emits the directive to move into the register tab. */
  @Output() redirectToRegister = new EventEmitter<void>();

  /** Triggers when user submits the form. */
  submit() {
    if (this.form.valid) {
      this.loginSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  /** Triggers when user clicks the button to register. */
  triggerRegisterRedirect() {
    this.redirectToRegister.emit();
  }
}
