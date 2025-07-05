import { Component } from '@angular/core';
import {NavigationBarComponent} from "../../../public/components/navigation-bar/navigation-bar";
import {Router, RouterOutlet} from '@angular/router';
import {BaseLayout} from '../../../shared/components/base-layout';
import {LayoutEventService} from '../../../shared/services/layout-event-service';
import {SnackbarService} from '../../../shared/services/snackbar-service';
import {TranslateService} from '@ngx-translate/core';
import {NavItem, NavItemCondition} from '../../../public/model/navigation-item';

@Component({
  selector: 'app-project-tracking-layout',
  imports: [
    NavigationBarComponent,
    RouterOutlet
  ],
  templateUrl: './project-tracking-layout.html',
  styleUrl: './project-tracking-layout.css'
})
export class ProjectTrackingLayout extends BaseLayout {
  constructor(
    layoutEvents: LayoutEventService,
    router: Router,
    snackbar: SnackbarService,
    translate: TranslateService
  ) {
    super(layoutEvents, router, snackbar, translate);
  }

  projectTrackingNavItems: NavItem[] = [
    { label: 'Summary', route: 'summary', icon: 'summarize' },
    { label: 'Change Process', route: 'change-process', icon: 'change_circle' },
    { label: 'Schedule', route: 'schedule', icon: 'event' }
  ];
}
