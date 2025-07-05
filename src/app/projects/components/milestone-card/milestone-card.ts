import { Component, Input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Milestone } from '../../model/milestone-entity';
import {DatePipe} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-milestone-card',
  standalone: true,
  imports: [MatCardModule, TranslateModule, DatePipe, MatIconModule],
  templateUrl: './milestone-card.html',
  styleUrl: './milestone-card.css'
})
export class MilestoneCard {
  @Input({ required: true }) milestone!: Milestone;
  expanded = signal(false);

  toggleExpanded(): void {
    this.expanded.update(e => !e);
  }
}
