import {Component, OnInit} from '@angular/core';
import {BaseTab} from '../../../shared/components/base-tab';
import {LayoutEventService} from '../../../shared/services/layout-event-service';
import {AppContextService} from '../../../shared/services/app-context-service';
import {TranslatePipe} from '@ngx-translate/core';
import {Organization} from '../../../organizations/model/organization-entity';
import {Project} from '../../../projects/model/project-entity';
import {DatePipe, NgClass} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {ChangeProcessService} from '../../services/change-process-service';
import {ChangeProcess} from '../../model/change-process-entity';
import {ChangeProcessEntityFromResourceAssembler} from '../../services/change-process-entity-from-resource-assembler';
import {ChangeProcessList} from '../../components/change-process-list/change-process-list';
import {OrganizationService} from '../../../organizations/services/organization-service';
import {ProjectService} from '../../../projects/services/project-service';
import {
  OrganizationEntityFromResourceAssembler
} from '../../../organizations/services/organization-entity-from-resource-assembler';
import {ProjectEntityFromResourceAssembler} from '../../../projects/services/project-entity-from-resource-assembler';

@Component({
  selector: 'app-summary-tab',
  imports: [
    MatCardModule,
    TranslatePipe,
    DatePipe,
    ChangeProcessList,
    NgClass
  ],
  templateUrl: './summary-tab.html',
  styleUrl: './summary-tab.css'
})
export class SummaryTab extends BaseTab implements OnInit {
  organization!: Organization;
  project!: Project;
  latestTwoChangeProcess: ChangeProcess[] = [];

  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private organizationService: OrganizationService,
    private projectService: ProjectService,
    private changeProcessService: ChangeProcessService
  ) {
    super(layoutEvents, appContextService);
  }

  ngOnInit() {
    this.project = this.getProjectOrThrow();
    this.reloadOrganization();

    this.changeProcessService.getByProjectId(this.project.id).subscribe({
      next: (changeProceses) => {
        this.latestTwoChangeProcess = changeProceses.map( changeProcess =>
          ChangeProcessEntityFromResourceAssembler(changeProcess)
        );

        if (!changeProceses?.length) {
          console.warn('No change processes returned from backend for current project.');
        }
      },
      error: (err) => {
        console.error('Failed to fetch change processes by projectId:', err);
      }
    });
  }

  private reloadOrganization() {
    this.organizationService.getByOrganizationId(this.project.organizationId).subscribe({
      next: (organization) => {
        this.organization = OrganizationEntityFromResourceAssembler(organization, this.getPersonIdOrThrow());
      }
    });
  }

  private temp(): void {
    this.projectService.getByProjectId(this.project.id).subscribe({
      next: (project) => {
        this.project = ProjectEntityFromResourceAssembler(project);
      }
    });
  }

}
