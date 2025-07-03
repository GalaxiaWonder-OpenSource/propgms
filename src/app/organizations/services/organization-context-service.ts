import { Injectable } from '@angular/core';
import { Organization } from '../model/organization-entity';

const ORG_DATA_KEY = 'selected_organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationContextService {
  private selectedOrg: Organization | null = null;

  constructor() {
    this.selectedOrg = this.getStoredOrganization();
  }

  setSelected(org: Organization): void {
    this.selectedOrg = org;
    localStorage.setItem(ORG_DATA_KEY, JSON.stringify(org));
  }

  getSelected(): Organization | null {
    return this.selectedOrg;
  }

  clear(): void {
    this.selectedOrg = null;
    localStorage.removeItem(ORG_DATA_KEY);
  }

  private getStoredOrganization(): Organization | null {
    const raw = localStorage.getItem(ORG_DATA_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
