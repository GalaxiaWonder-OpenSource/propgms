import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Milestone } from '../../model/milestone-entity';
import { EmptyListMessagePlaceholder } from '../../../public/components/empty-list-message-placeholder/empty-list-message-placeholder';
import { MilestoneCard } from '../milestone-card/milestone-card';
import { Task } from '../../model/task-entity';

@Component({
  selector: 'app-milestone-list',
  standalone: true,
  imports: [
    EmptyListMessagePlaceholder,
    MilestoneCard
  ],
  templateUrl: './milestone-list.html',
  styleUrl: './milestone-list.css'
})
export class MilestoneList {
  @Input() milestoneList: Milestone[] = [];
  @Output() milestoneLoadTasks = new EventEmitter<number>();

  @Input() tasksByMilestone: { [milestoneId: number]: Task[] } = {};

  onMilestoneSelect(id: number): void {
    this.milestoneLoadTasks.emit(id);
  }
}
