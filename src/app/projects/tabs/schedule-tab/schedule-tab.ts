import {Component, OnInit} from '@angular/core';
import {Milestone} from '../../model/milestone-entity';
import {BaseTab} from '../../../shared/components/base-tab';
import {LayoutEventService} from '../../../shared/services/layout-event-service';
import {AppContextService} from '../../../shared/services/app-context-service';
import {MilestoneService} from '../../services/milestone-service';
import {MilestoneList} from '../../components/milestone-list/milestone-list';
import {MilestoneEntityFromResourceAssembler} from '../../services/milestone-entity-from-resource-assembler';

@Component({
  selector: 'app-client-schedule-tab',
  imports: [
    MilestoneList
  ],
  templateUrl: './schedule-tab.html',
  styleUrl: './schedule-tab.css'
})
export class ScheduleTab extends BaseTab implements OnInit {
  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private milestoneService: MilestoneService
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
}
