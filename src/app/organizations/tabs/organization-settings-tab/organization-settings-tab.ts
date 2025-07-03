import { Component } from '@angular/core';
import { OrganizationDangerZone } from '../../components/organization-danger-zone/organization-danger-zone';
import { BaseTab } from '../../../shared/components/base-tab';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { OrganizationService } from '../../services/organization-service';

@Component({
  selector: 'app-organization-settings-tab',
  standalone: true,
  imports: [OrganizationDangerZone],
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
        this.emitSnackbar('success', 'organizations.settings.delete-success');
        this.switchLayout("/worker/organizations");
      },
      error: (err) => {
        console.error('Failed to delete organization:', err);
        this.emitSnackbar('error', 'organizations.settings.delete-failure');
      }
    });
  }
}
