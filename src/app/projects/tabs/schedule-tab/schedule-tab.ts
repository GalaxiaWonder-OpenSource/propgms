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
import { Task } from '../../model/task-entity';
import {TaskService} from '../../services/task-service';
import {TaskEntityFromResourceAssembler} from '../../services/task-entity-from-resource-assmbler';
import {CreateTaskModal} from '../../components/create-task-modal/create-task-modal';
import {CreateTaskResource} from '../../resources/create-task-resource';

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
    private taskService: TaskService,
    private dialog: MatDialog
  ) {
    super(layoutEvents, appContextService);
  }

  protected milestoneList!: Milestone[];
  tasksByMilestone: { [milestoneId: number]: Task[] } = {};
  selectedTasks: Task[] = [];

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
      data: {projectId}
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

  onMilestoneClicked(milestoneId: number): void {
    this.taskService.getByMilestoneId(milestoneId).subscribe({
      next: (tasks) => {
        console.log(tasks);
        this.tasksByMilestone[milestoneId] = tasks.map(task =>
          TaskEntityFromResourceAssembler(task)
        );
      },
      error: () => {
        this.emitSnackbar('error', 'project.schedule.tasks-fetch-failure');
      }
    });
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskModal, {
      data: { milestones: this.milestoneList }
    });

    dialogRef.afterClosed().subscribe((result: CreateTaskResource | undefined) => {
      if (result) {
        this.taskService.createTask(result).subscribe({
          next: (response) => {
            this.tasksByMilestone[result.milestoneId].push(TaskEntityFromResourceAssembler(response));
            this.emitSnackbar("success", "project.schedule.task-create-success");
          },
          error: () => {
            this.emitSnackbar("error", "project.schedule.task-create-failure");
          }
        });
      }
    });
  }
}
