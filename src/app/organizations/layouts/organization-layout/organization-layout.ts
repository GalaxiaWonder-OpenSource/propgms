import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {BaseLayout} from '../../../shared/components/base-layout';
import {LayoutEventService} from '../../../shared/services/layout-event-service';
import {SnackbarService} from '../../../shared/services/snackbar-service';
import {NavigationBarComponent} from '../../../public/components/navigation-bar/navigation-bar';
import {NavItem, NavItemCondition} from '../../../public/model/navigation-item';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-organization-layout',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: './organization-layout.html',
  styleUrl: './organization-layout.css'
})
export class OrganizationLayout extends BaseLayout {
  constructor(
    layoutEvents: LayoutEventService,
    router: Router,
    snackbar: SnackbarService,
    translate: TranslateService
  ) {
    super(layoutEvents, router, snackbar, translate);
  }

  organizationNavItems: NavItem[] = [
    { label: 'organization.nav.projects', route: 'projects', icon: 'work' },
    { label: 'organization.nav.members', route: 'members', icon: 'group' },
    { label: 'organization.nav.settings', route: 'settings', icon: 'settings', condition: NavItemCondition.MUST_BE_OWNER}
  ];
}
