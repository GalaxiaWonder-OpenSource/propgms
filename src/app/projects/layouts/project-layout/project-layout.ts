import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BaseLayout } from '../../../shared/components/base-layout';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { SnackbarService } from '../../../shared/services/snackbar-service';
import { NavigationBarComponent } from '../../../public/components/navigation-bar/navigation-bar';
import { NavItem, NavItemCondition } from '../../../public/model/navigation-item';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-layout',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: './project-layout.html',
  styleUrl: './project-layout.css'
})
export class ProjectLayout extends BaseLayout {
  constructor(
    layoutEvents: LayoutEventService,
    router: Router,
    snackbar: SnackbarService,
    translate: TranslateService
  ) {
    super(layoutEvents, router, snackbar, translate);
  }

  projectNavItems: NavItem[] = [
    { label: 'project.nav.schedule', route: 'schedule', icon: 'event' },
    { label: 'project.nav.team-members', route: 'team', icon: 'group' },
    { label: 'project.nav.settings', route: 'settings', icon: 'settings', condition: NavItemCondition.MUST_BE_OWNER }
  ];
}
