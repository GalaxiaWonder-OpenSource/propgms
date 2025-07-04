import {Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

import { BaseTab } from '../../../shared/components/base-tab';
import { LoginForm } from '../../components/login-form/login-form';

import { UserAccount } from '../../model/user-account';
import { AuthenticationService } from '../../services/authentication-service';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';

import { SignInResourceFromEntityAssembler } from '../../services/sign-in-resource-from-entity-assembler';
import { SignInResponseResource } from '../../resources/sign-in-response-resource';

import {UserAccountType} from '../../model/user-account-type';

@Component({
  selector: 'app-login-tab',
  standalone: true,
  imports: [TranslatePipe, LoginForm],
  templateUrl: './login-tab.html',
  styleUrl: './login-tab.css'
})
export class LoginTab extends BaseTab implements OnInit {

  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private authService: AuthenticationService,
  ) {
    super(layoutEvents, appContextService);
  }

  ngOnInit() {
    if(this.appContext.personId && this.appContext.token && this.appContext.accountType) {
      this.redirectAfterLogin();
    }
  }

  handleFormSubmission(account: UserAccount) {
    const payload = SignInResourceFromEntityAssembler(account);

    this.authService.signIn(payload).subscribe({
      next: (response: SignInResponseResource) => {
        this.setToken(response.token);
        this.setPersonId(response.user.personId);
        this.setAccountType(response.user.userType)
        this.emitSnackbar('success', 'auth.login.success');
        this.redirectAfterLogin();
      },
      error: () => {
        this.emitSnackbar('error', 'auth.login.failure');
      }
    });
  }

  handleRegisterRedirect() {
    this.switchTab('/register');
  }

  redirectAfterLogin() {
    var accountType = this.getAccountTypeOrThrow();

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
