import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BaseTab } from '../../../shared/components/base-tab';
import { RegisterForm } from '../../components/register-form/register-form';

import { Person } from '../../model/person';
import { UserAccount } from '../../model/user-account';

import { AuthenticationService } from '../../services/authentication-service';
import { LayoutEventService } from '../../../shared/services/layout-event-service';

import { SignUpResourceFromEntityAssembler } from '../../services/sign-up-resource-from-entity-assembler';
import {AppContextService} from '../../../shared/services/app-context-service';


@Component({
  selector: 'app-register-tab',
  standalone: true,
  imports: [TranslatePipe, RegisterForm],
  templateUrl: './register-tab.html',
  styleUrl: './register-tab.css'
})
export class RegisterTab extends BaseTab {

  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private authService: AuthenticationService
  ) {
    super(layoutEvents, appContextService);
  }

  handleFormSubmission(data: { person: Person; account: UserAccount }) {
    const payload = SignUpResourceFromEntityAssembler(data.person, data.account);

    this.authService.signUp(payload).subscribe({
      next: () => {
        this.emitSnackbar('success', 'Signup successful!');
        this.switchTab('/login');
      },
      error: () => {
        this.emitSnackbar('error', 'Signup failed. Please try again.');
      }
    });
  }

  handleLoginRedirect() {
    this.switchTab('/login');
  }
}
