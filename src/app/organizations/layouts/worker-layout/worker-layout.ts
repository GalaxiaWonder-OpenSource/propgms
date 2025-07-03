import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BaseLayout } from '../../../shared/components/base-layout';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { SnackbarService } from '../../../shared/services/snackbar-service';
import {NavigationBarComponent} from '../../../public/components/navigation-bar/navigation-bar';
import {NavItem} from '../../../public/model/navigation-item';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-worker-layout',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: 'worker-layout.html',
  styleUrl: './worker-layout.css'
})
export class WorkerLayout extends BaseLayout {
  constructor(
    layoutEvents: LayoutEventService,
    router: Router,
    snackbar: SnackbarService,
    translate: TranslateService
  ) {
    super(layoutEvents, router, snackbar, translate);
  }

  organizationNavItems: NavItem[] = [
    { label: 'Organizations', route: '/worker/organizations', icon: 'apartment' },
    { label: 'Invitations', route: '/worker/invitations', icon: 'mail' }
  ];
}
