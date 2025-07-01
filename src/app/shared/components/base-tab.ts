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

  protected switchTab(to: string): void {
    this.layoutEvents.emit({
      type: 'SWITCH_TAB',
      to
    });
  }

  protected switchLayout(layoutId: string): void {
    this.layoutEvents.emit({
      type: 'SWITCH_LAYOUT',
      layoutId
    });
  }
}
