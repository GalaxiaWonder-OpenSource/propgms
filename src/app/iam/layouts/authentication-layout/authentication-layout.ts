import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BaseLayout } from '../../../shared/components/base-layout';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { SnackbarService } from '../../../shared/services/snackbar-service';

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
    snackbar: SnackbarService
  ) {
    super(layoutEvents, router, snackbar);
  }
}
