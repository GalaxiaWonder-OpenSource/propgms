import { Injectable } from '@angular/core';
import {Organization} from '../model/organization-entity';

@Injectable({
  providedIn: 'root'
})
export class OrganizationContextService {
  private selectedOrg: Organization | null = null;

  setSelected(org: Organization) {
    this.selectedOrg = org;
  }

  getSelected(): Organization | null {
    return this.selectedOrg;
  }

  clear() {
    this.selectedOrg = null;
  }
}
