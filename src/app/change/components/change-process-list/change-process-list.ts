import { Component, Input } from '@angular/core';
import { ChangeProcess } from '../../model/change-process-entity';
import { ChangeProcessCard } from '../change-process-card/change-process-card';
import { EmptyListMessagePlaceholder } from '../../../public/components/empty-list-message-placeholder/empty-list-message-placeholder';

@Component({
  selector: 'app-change-process-list',
  standalone: true,
  imports: [
    ChangeProcessCard,
    EmptyListMessagePlaceholder
  ],
  templateUrl: './change-process-list.html'
})
export class ChangeProcessList {
  @Input() changeProcessList: ChangeProcess[] = [];
}
