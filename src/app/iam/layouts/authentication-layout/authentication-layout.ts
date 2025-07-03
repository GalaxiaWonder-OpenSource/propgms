import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BaseLayout } from '../../../shared/components/base-layout';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { SnackbarService } from '../../../shared/services/snackbar-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-authentication-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './authentication-layout.html',
  styleUrl: './authentication-layout.css'
})
export class AuthenticationLayout extends BaseLayout {
  constructor(
    layoutEvents: LayoutEventService,
    router: Router,
    snackbar: SnackbarService,
    translate: TranslateService
  ) {
    super(layoutEvents, router, snackbar, translate);
  }
}
