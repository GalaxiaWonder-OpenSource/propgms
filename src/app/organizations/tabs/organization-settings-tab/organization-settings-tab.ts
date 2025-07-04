import { Component } from '@angular/core';
import { OrganizationDangerZone } from '../../components/organization-danger-zone/organization-danger-zone';
import { BaseTab } from '../../../shared/components/base-tab';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { OrganizationService } from '../../services/organization-service';
import {EditOrganizationForm} from '../../components/edit-organization-form/edit-organization-form';
import {UpdateOrganizationResource} from '../../resources/update-organization-resource';

@Component({
  selector: 'app-organization-settings-tab',
  standalone: true,
  imports: [OrganizationDangerZone, EditOrganizationForm],
  templateUrl: './organization-settings-tab.html',
  styleUrl: './organization-settings-tab.css'
})
export class OrganizationSettingsTab extends BaseTab {
  constructor(
    layoutEvents: LayoutEventService,
    appContext: AppContextService,
    private organizationService: OrganizationService
  ) {
    super(layoutEvents, appContext);
  }

  handleDelete(): void {
    const organization = this.getOrganizationOrThrow();

    this.organizationService.deleteOrganizationByRuc(organization.ruc).subscribe({
      next: (response) => {
        this.emitSnackbar('success', 'organization.settings.delete-success');
        this.switchLayout("/worker/organizations");
      },
      error: (err) => {
        console.error('Failed to delete organization:', err);
        this.emitSnackbar('error', 'organization.settings.delete-failure');
      }
    });
  }

  handleUpdate(resource: UpdateOrganizationResource) {
    const organization = this.getOrganizationOrThrow();

    this.organizationService.updateOrganization(resource, organization.id).subscribe({
      next: (response) => {
        organization.updateCommercialName(resource.commercialName);
        organization.updateLegalName(resource.legalName);
        this.emitSnackbar('success', 'organization.settings.update-success');
      },
      error: (err) => {
        console.error('Failed to delete organization:', err);
        this.emitSnackbar('error', 'organization.settings.update-failure');
      }
    });
  }
}
