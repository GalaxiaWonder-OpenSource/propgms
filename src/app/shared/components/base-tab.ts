import { Directive } from '@angular/core';
import { LayoutEventService } from '../services/layout-event-service';
import { AppContextService } from '../services/app-context-service';

@Directive()
export abstract class BaseTab {
  constructor(
    protected layoutEvents: LayoutEventService,
    protected appContext: AppContextService
  ) {}

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

  protected getTokenOrThrow(): string {
    const token = this.appContext.token;
    if (!token) {
      throw new Error('Missing token in application context.');
    }
    return token;
  }

  protected getPersonIdOrThrow(): number {
    const id = this.appContext.personId;
    if (id === undefined) {
      throw new Error('Missing person ID in application context.');
    }
    return id;
  }

  protected setToken(token: string | undefined): void {
    this.appContext.token = token;
  }

  protected setPersonId(personId: number | undefined): void {
    this.appContext.personId = personId;
  }
}
