import { Component } from '@angular/core';
import { EditProjectForm } from '../../components/edit-project-form/edit-project-form';
import { ProjectDangerZone } from '../../components/project-danger-zone/project-danger-zone';
import { BaseTab } from '../../../shared/components/base-tab';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { ProjectService } from '../../services/project-service';
import { UpdateProjectResource } from '../../resources/update-project-resource';

@Component({
  selector: 'app-project-settings-tab',
  standalone: true,
  imports: [EditProjectForm, ProjectDangerZone],
  templateUrl: './project-settings-tab.html',
  styleUrl: './project-settings-tab.css'
})
export class ProjectSettingsTab extends BaseTab {
  constructor(
    layoutEvents: LayoutEventService,
    appContext: AppContextService,
    private projectService: ProjectService
  ) {
    super(layoutEvents, appContext);
  }

  handleDelete(): void {
    const project = this.getProjectOrThrow();

    this.projectService.deleteProjectById(project.id).subscribe({
      next: () => {
        this.emitSnackbar('success', 'project.settings.delete-success');
        this.switchLayout('/worker/projects');
      },
      error: (err) => {
        console.error('Failed to delete project:', err);
        this.emitSnackbar('error', 'project.settings.delete-failure');
      }
    });
  }

  handleUpdate(resource: UpdateProjectResource) {
    const project = this.getProjectOrThrow();

    this.projectService.updateProjectById(resource, project.id).subscribe({
      next: () => {
        if (resource.name) project.projectName = resource.name;
        if (resource.description) project.description = resource.description;
        if (resource.status) project.status = resource.status;
        if (resource.endingDate) project.endDate = resource.endingDate;

        this.emitSnackbar('success', 'project.settings.update-success');
      },
      error: (err) => {
        console.error('Failed to update project:', err);
        this.emitSnackbar('error', 'project.settings.update-failure');
      }
    });
  }
}
