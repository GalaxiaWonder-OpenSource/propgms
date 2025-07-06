import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Milestone } from '../../model/milestone-entity';
import {DatePipe} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import { Task } from '../../model/task-entity';

@Component({
  selector: 'app-milestone-card',
  standalone: true,
  imports: [MatCardModule, TranslateModule, DatePipe, MatIconModule],
  templateUrl: './milestone-card.html',
  styleUrl: './milestone-card.css'
})
export class MilestoneCard {
  @Input({ required: true }) milestone!: Milestone;

  @Output() loadTasks = new EventEmitter<number>();
  @Input() taskList: Task[] = [];

  expanded = signal(false);

  onClick(): void {
    this.toggleExpanded();
  }

  private toggleExpanded(): void {
    this.expanded.update(e => {
      const next = !e;
      if (next) this.loadTasks.emit(this.milestone.id);
      return next;
    });
  }
}
