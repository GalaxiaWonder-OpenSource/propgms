import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BaseTab } from '../../../shared/components/base-tab';

import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { OrganizationService } from '../../services/organization-service';

import { OrganizationEntityFromResourceAssembler } from '../../services/organization-entity-from-resource-assembler';

import {Organization} from '../../model/organization-entity';
import {OrganizationList} from '../../components/organization-list/organization-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {CreateOrganizationModal} from '../../components/create-organization-modal/create-organization-modal';
import {CreateOrganizationResource} from '../../../iam/resources/create-organization-resource';

@Component({
  selector: 'app-organizations-tab',
  standalone: true,
  imports: [TranslatePipe, OrganizationList, MatIconModule, MatButtonModule],
  templateUrl: './organizations-tab.html',
  styleUrl: './organizations-tab.css'
})
export class OrganizationsTab extends BaseTab implements OnInit {
  organizationsList: Organization[] = [];

  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private organizationService: OrganizationService,
    private dialog: MatDialog
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

  openCreateOrganizationModal() {
    const dialogRef = this.dialog.open(CreateOrganizationModal);

    dialogRef.afterClosed().subscribe((result: Partial<CreateOrganizationResource> | undefined) => {
      if (result) {
        const personId = this.getPersonIdOrThrow();

        const resource: CreateOrganizationResource = {
          legalName: result.legalName ?? '',
          commercialName: result.commercialName ?? '',
          ruc: result.ruc ?? '',
          createdBy: personId
        };

        this.organizationService.createOrganization(resource).subscribe({
          next: (response) => {
            this.emitSnackbar("success", "worker.organizations.create-success")
            this.organizationsList.push(
              OrganizationEntityFromResourceAssembler(response, personId)
            )
          },
          error: (err) => {
            this.emitSnackbar("error", "worker.organizations.create-failure")
          }
        });
      }
    });
  }
}
