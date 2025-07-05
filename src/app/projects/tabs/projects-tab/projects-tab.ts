import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

import {BaseTab} from '../../../shared/components/base-tab';
import {LayoutEventService} from '../../../shared/services/layout-event-service';
import {AppContextService} from '../../../shared/services/app-context-service';
import {ProjectService} from '../../services/project-service';

import {Project} from '../../model/project-entity';
import {ProjectList} from '../../components/project-list/project-list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {CreateProjectResource} from '../../resources/create-project-resource';
import {CreateProjectModal} from '../../components/create-project-modal/create-project-modal';
import {UserAccountType} from '../../../iam/model/user-account-type';
import {ProjectEntityFromResourceAssembler} from '../../services/project-entity-from-resource-assembler';

@Component({
  selector: 'app-projects-tab',
  standalone: true,
  imports: [
    ProjectList,
    MatIconModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './projects-tab.html',
  styleUrl: './projects-tab.css'
})
export class ProjectsTab extends BaseTab implements OnInit {
  projectsList: Project[] = [];
  layout: string = "";

  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {
    super(layoutEvents, appContextService);
  }

  ngOnInit(): void {
    const personId = this.getPersonIdOrThrow();
    const accountType = this.getAccountTypeOrThrow();

    switch(accountType) {
      case UserAccountType.TYPE_WORKER: {
        this.layout = "organization"
        this.projectService.getByTeamMemberPersonId(personId).subscribe({
          next: (projects) => {
            this.projectsList = (projects).map(project =>
              ProjectEntityFromResourceAssembler(project)
            );
            if (!projects?.length) {
              console.warn('No projects returned from backend for current user.');
            }
          },
          error: (err) => {
            console.error('Failed to fetch projects by personId:', err);
          }
        });
      }
      break;

      case UserAccountType.TYPE_CLIENT: {
        this.layout = "client"
        this.projectService.getByContractingEntityPersonId(personId).subscribe({
          next: (projects) => {
            this.projectsList = projects || [];
            if (!projects?.length) {
              console.warn('No projects returned from backend for current user.');
            }
          },
          error: (err) => {
            console.error('Failed to fetch projects by personId:', err);
          }
        });
      }
      break;

      default: {
        console.warn("Unmanaged user account type when loading projects.")
        return;
      }
    }
  }

  openCreateProjectModal(): void {
    if(this.getAccountTypeOrThrow() == UserAccountType.TYPE_CLIENT) return;

    const dialogRef = this.dialog.open(CreateProjectModal);

    dialogRef.afterClosed().subscribe((result: Partial<CreateProjectResource> | undefined) => {
      if (result) {
        var organization = this.getOrganizationOrThrow();

        const resource: CreateProjectResource = {
          projectName: result.projectName ?? '',
          description: result.description ?? '',
          startDate: result.startDate ?? new Date(),
          endDate: result.endDate ?? new Date(),
          organizationId: organization.id,
          contractingEntityEmail: result.contractingEntityEmail ?? ''
        };

        this.projectService.createProject(resource).subscribe({
          next: (response) => {
            this.emitSnackbar("success", "organization.projects.create-success");
            this.projectsList.push(response);
          },
          error: () => {
            this.emitSnackbar("error", "organization.projects.create-failure");
          }
        });
      }
    });
  }

  handleClick(project: Project): void {
    if (!project.id) return;
    const accountType = this.getAccountTypeOrThrow();

    this.setProject(project);

    switch(accountType) {
      case UserAccountType.TYPE_WORKER: {
        this.switchLayout(`/projects/${project.id}`);
      }
      break;

      case UserAccountType.TYPE_CLIENT: {
        this.switchLayout(`/project-tracking/${project.id}`);
      }
      break;

      default: {
        console.warn("Unmanaged user account type when redirecting upon card click.");
        return;
      }
    }

  }

  protected readonly UserAccountType = UserAccountType;
}
