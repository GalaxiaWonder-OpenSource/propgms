import { Component } from '@angular/core';
import {BaseTab} from '../../../shared/components/base-tab';
import {LayoutEventService} from '../../../shared/services/layout-event-service';
import {AppContextService} from '../../../shared/services/app-context-service';
import {ComingSoon} from '../../../public/components/coming-soon/coming-soon';

@Component({
  selector: 'app-schedule-tab',
  standalone: true,
  imports: [
    ComingSoon
  ],
  templateUrl: './schedule-tab.html',
  styleUrl: './schedule-tab.css'
})
export class ScheduleTab extends BaseTab {
  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService
  ) {
    super(layoutEvents, appContextService);
  }
}
