import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BaseTab } from '../../../shared/components/base-tab';
import { LoginForm } from '../../components/login-form/login-form';

import { UserAccount } from '../../model/user-account';
import { AuthenticationService } from '../../services/authentication-service';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';

import { SignInResourceFromEntityAssembler } from '../../services/SignInResourceFromEntityAssembler';
import { SignInResponseResource } from '../../resources/SignInResponseResource';

import {UserAccountType} from '../../model/user-account-type';

@Component({
  selector: 'app-login-tab',
  standalone: true,
  imports: [TranslatePipe, LoginForm],
  templateUrl: './login-tab.html',
  styleUrl: './login-tab.css'
})
export class LoginTab extends BaseTab {

  constructor(
    layoutEvents: LayoutEventService,
    private authService: AuthenticationService,
    private appContextService: AppContextService
  ) {
    super(layoutEvents);
  }

  handleFormSubmission(account: UserAccount) {
    const payload = SignInResourceFromEntityAssembler(account);

    this.authService.signIn(payload).subscribe({
      next: (response: SignInResponseResource) => {
        this.appContextService.token = response.token;
        this.appContextService.personId = response.user.personId;
        this.emitSnackbar('success', 'Login successful!');
        this.redirectAfterLogin(UserAccountType[response.user.userType as keyof typeof UserAccountType]);
      },
      error: () => {
        this.emitSnackbar('error', 'Login failed. Please check your credentials.');
      }
    });
  }

  handleRegisterRedirect() {
    this.switchTab('/register');
  }

  redirectAfterLogin(accountType: UserAccountType) {
    switch (accountType) {
      case UserAccountType.TYPE_WORKER: {
        this.switchLayout('/worker');
        break;
      }
      default: {
        console.warn("Error managing auto redirect after login for user with account type: " + accountType)
        return;
      }
    }
  }
}
