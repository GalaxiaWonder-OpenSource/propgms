import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Invitation } from '../../model/invitation-entity';
import { TranslatePipe } from '@ngx-translate/core';
import { EmptyListMessagePlaceholderComponent } from '../../../public/components/empty-list-message-placeholder/empty-list-message-placeholder';
import {InvitationCard} from '../invitation-card/invitation-card';

@Component({
  selector: 'app-invitation-list',
  standalone: true,
  imports: [
    EmptyListMessagePlaceholderComponent,
    InvitationCard
  ],
  templateUrl: './invitation-list.html',
  styleUrl: './invitation-list.css'
})
export class InvitationList {
  @Input() invitationList: Invitation[] = [];
  @Input() showActions!: boolean;

  @Output() accept = new EventEmitter<number>();
  @Output() reject = new EventEmitter<number>();


  onAccept(invitationId: number): void {
    this.accept.emit(invitationId);
  }

  onReject(invitationId: number): void {
    this.reject.emit(invitationId);
  }
}
