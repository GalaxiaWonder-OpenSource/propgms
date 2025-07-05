import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BaseLayout } from '../../../shared/components/base-layout';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { SnackbarService } from '../../../shared/services/snackbar-service';
import { NavigationBarComponent } from '../../../public/components/navigation-bar/navigation-bar';
import { TranslateService } from '@ngx-translate/core';
import {NavItem, NavItemCondition} from '../../../public/model/navigation-item';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.css'
})
export class ClientLayout extends BaseLayout {
  constructor(
    layoutEvents: LayoutEventService,
    router: Router,
    snackbar: SnackbarService,
    translate: TranslateService
  ) {
    super(layoutEvents, router, snackbar, translate);
  }

  clientNavItems: NavItem[] = [
    { label: 'Projects', route: 'projects', icon: 'work' },
    { label: 'Find organizations', route: 'organizations', icon: 'corporate_fare' }
  ];
}
