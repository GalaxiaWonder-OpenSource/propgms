import { Directive } from '@angular/core';
import {LayoutEventService} from '../services/layout-event-service';

@Directive()
export abstract class BaseTab {
  constructor(protected layoutEvents: LayoutEventService) {}

  protected emitSnackbar(level: 'success' | 'error' | 'info', message: string): void {
    this.layoutEvents.emit({
      type: 'SNACKBAR',
      level,
      message
    });
  }

  protected switchTab(tab: string): void {
    this.layoutEvents.emit({
      type: 'SWITCH_TAB',
      to: tab
    });
  }

  protected switchLayout(layout: string): void {
    this.layoutEvents.emit({
      type: 'SWITCH_LAYOUT',
      layoutId: layout
    });
  }
}
