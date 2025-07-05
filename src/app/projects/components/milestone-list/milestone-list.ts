import { Component, Input } from '@angular/core';
import { Milestone } from '../../model/milestone-entity';
import {
  EmptyListMessagePlaceholder
} from '../../../public/components/empty-list-message-placeholder/empty-list-message-placeholder';
import {MilestoneCard} from '../milestone-card/milestone-card';

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
}
