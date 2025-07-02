import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BaseLayout } from '../../../shared/components/base-layout';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { SnackbarService } from '../../../shared/services/snackbar-service';

@Component({
  selector: 'app-organization-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './organization-layout.html',
  styleUrl: './organization-layout.css'
})
export class OrganizationLayout extends BaseLayout {
  constructor(
    layoutEvents: LayoutEventService,
    router: Router,
    snackbar: SnackbarService
  ) {
    super(layoutEvents, router, snackbar);
  }
}
