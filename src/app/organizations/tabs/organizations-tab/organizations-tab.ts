import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BaseTab } from '../../../shared/components/base-tab';

import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { OrganizationService } from '../../services/organization-service';

import { OrganizationEntityFromResourceAssembler } from '../../services/organization-entity-from-resource-assembler';

import {Organization} from '../../model/organization-entity';
import {OrganizationList} from '../../components/organization-list/organization-list';

@Component({
  selector: 'app-organizations-tab',
  standalone: true,
  imports: [TranslatePipe, OrganizationList],
  templateUrl: './organizations-tab.html',
  styleUrl: './organizations-tab.css'
})
export class OrganizationsTab extends BaseTab implements OnInit {
  organizationsList: Organization[] = [];

  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private organizationService: OrganizationService
  ) {
    super(layoutEvents, appContextService);
  }

  ngOnInit(): void {
    const personId = this.getPersonIdOrThrow();

    this.organizationService.getByPersonId(personId).subscribe({
      next: (organizations) => {
        if (!organizations || organizations.length === 0) {
          this.organizationsList = [];
          console.warn('No organizations returned from backend for current user.');
          return;
        }

        this.organizationsList = organizations.map(org =>
          OrganizationEntityFromResourceAssembler(org, personId)
        );
      },
      error: (err) => {
        console.error('Failed to fetch organization by personId:', err);
      }
    });
  }
}
