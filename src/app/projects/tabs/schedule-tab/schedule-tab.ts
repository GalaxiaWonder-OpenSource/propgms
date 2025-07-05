import {Component, OnInit} from '@angular/core';
import {Milestone} from '../../model/milestone-entity';
import {BaseTab} from '../../../shared/components/base-tab';
import {LayoutEventService} from '../../../shared/services/layout-event-service';
import {AppContextService} from '../../../shared/services/app-context-service';
import {MilestoneService} from '../../services/milestone-service';
import {MilestoneList} from '../../components/milestone-list/milestone-list';
import {MilestoneEntityFromResourceAssembler} from '../../services/milestone-entity-from-resource-assembler';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateMilestoneResource} from '../../resources/create-milestone-resource';
import {CreateMilestoneModal} from '../../components/create-milestone-modal/create-milestone-modal';

@Component({
  selector: 'app-client-schedule-tab',
  imports: [
    MilestoneList, MatButtonModule, TranslatePipe
  ],
  templateUrl: './schedule-tab.html',
  styleUrl: './schedule-tab.css'
})
export class ScheduleTab extends BaseTab implements OnInit {
  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private milestoneService: MilestoneService,
    private dialog: MatDialog
  ) {
    super(layoutEvents, appContextService);
  }

  protected milestoneList!: Milestone[];

  ngOnInit() {
    const project = this.getProjectOrThrow();

    this.milestoneService.getByProjectId(project.id).subscribe({
      next: (milestones) => {
        this.milestoneList = milestones.map(milestone =>
          MilestoneEntityFromResourceAssembler(milestone)
        )
      },
      error: (err) => {
        console.error('Failed to fetch milestones by projectId:', err);
      }
    });
  }

  openCreateMilestoneDialog(): void {
    const projectId = this.getProjectOrThrow().id;

    const dialogRef = this.dialog.open(CreateMilestoneModal, {
      data: { projectId }
    });

    dialogRef.afterClosed().subscribe((result: CreateMilestoneResource | undefined) => {
      if (result) {
        this.milestoneService.createMilestone(result).subscribe({
          next: (response) => {
            this.milestoneList.push(
              MilestoneEntityFromResourceAssembler(response)
            );
            this.emitSnackbar("success", "project.schedule.create-success");
          },
          error: () => {
            this.emitSnackbar("error", "project.schedule.create-failure");
          }
        });
      }
    });
  }

}
