import { Directive } from '@angular/core';
import { LayoutEventService } from '../services/layout-event-service';
import { AppContextService } from '../services/app-context-service';
import {Organization} from '../../organizations/model/organization-entity';
import {UserAccountType} from '../../iam/model/user-account-type';
import {Project} from '../../projects/model/project-entity';

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

  protected getAccountTypeOrThrow(): UserAccountType {
    const type = this.appContext.accountType;
    if (!type) {
      throw new Error('Missing account type in application context.');
    }
    return type;
  }

  protected getOrganizationOrThrow(): Organization {
    const organization = this.appContext.organization;
    if (!organization) {
      throw new Error('Missing organization in application context.');
    }
    return organization;
  }

  protected getProjectOrThrow(): Project {
    const project = this.appContext.project;
    if (!project) {
      throw new Error('Missing project in application context.');
    }
    return project;
  }

  protected setToken(token: string | undefined): void {
    this.appContext.token = token;
  }

  protected setPersonId(personId: number | undefined): void {
    this.appContext.personId = personId;
  }

  protected setAccountType(type: string | undefined): void {
    if (type && Object.values(UserAccountType).includes(type as UserAccountType)) {
      this.appContext.accountType = type as UserAccountType;
    } else {
      this.appContext.accountType = undefined;
    }
  }

  protected setOrganization(org: Organization | null): void {
    this.appContext.organization = org;
  }

  protected setProject(pro: Project | null ): void {
    this.appContext.project = pro;
  }
}
