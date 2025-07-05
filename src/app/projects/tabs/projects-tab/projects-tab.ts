import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BaseTab } from '../../../shared/components/base-tab';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { ProjectService } from '../../services/project-service';

import { Project } from '../../model/project-entity';
import { ProjectList } from '../../components/project-list/project-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectResource } from '../../resources/create-project-resource';
import {CreateProjectModal} from '../../components/create-project-modal/create-project-modal';

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

    this.projectService.getByTeamMemberPersonId(personId).subscribe({
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

  openCreateProjectModal(): void {
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

    this.appContext.project = project;
    this.switchLayout(`/projects/${project.id}`);
  }
}
