import { Injectable } from '@angular/core';
import { IamContextService } from '../../iam/services/iam-context-service';
import {OrganizationContextService} from '../../organizations/services/organization-context-service';
import {Organization} from '../../organizations/model/organization-entity';
import {UserAccountType} from '../../iam/model/user-account-type';

@Injectable({ providedIn: 'root' })
export class AppContextService {
  constructor(
    private iamContextService: IamContextService,
    private organizationContextService: OrganizationContextService
  ) {}

  get token(): string | undefined {
    return this.iamContextService.getToken() || undefined;
  }

  set token(token: string | undefined) {
    if (token) {
      this.iamContextService.setToken(token);
    } else {
      this.iamContextService.clearToken();
    }
  }

  get personId(): number | undefined {
    return this.iamContextService.getPersonId() ?? undefined;
  }

  set personId(id: number | undefined) {
    if (id !== undefined) {
      this.iamContextService.setPersonId(id);
    } else {
      this.iamContextService.clearPersonId();
    }
  }

  get accountType(): UserAccountType | undefined {
    return this.iamContextService.getAccountType() ?? undefined;
  }

  set accountType(type: UserAccountType | undefined) {
    if (type !== undefined) {
      this.iamContextService.setAccountType(type);
    } else {
      this.iamContextService.clearAccountType();
    }
  }

  get organization(): Organization | null {
    return this.organizationContextService.getSelected();
  }

  set organization(org: Organization | null) {
    if (org) {
      this.organizationContextService.setSelected(org);
    } else {
      this.organizationContextService.clear();
    }
  }
}

