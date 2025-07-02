import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BaseLayout } from '../../../shared/components/base-layout';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { SnackbarService } from '../../../shared/services/snackbar-service';
import {NavigationBarComponent} from '../../../public/components/navigation-bar/navigation-bar';
import {NavItem} from '../../../public/model/navigation-item';

@Component({
  selector: 'app-organization-layout',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: './worker-dashboard-layout.component.html',
  styleUrl: './worker-dashboard-layout.component.css'
})
export class WorkerDashboardLayout extends BaseLayout {
  constructor(
    layoutEvents: LayoutEventService,
    router: Router,
    snackbar: SnackbarService
  ) {
    super(layoutEvents, router, snackbar);
  }

  organizationNavItems: NavItem[] = [
    { label: 'Organizations', route: '/worker/organizations', icon: 'apartment' },
    { label: 'Invitations', route: '/worker/invitations', icon: 'mail' }
  ];
}
