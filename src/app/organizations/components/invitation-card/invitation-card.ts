import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe, NgIf } from '@angular/common';
import { Invitation } from '../../model/invitation-entity';

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    TranslatePipe,
    DatePipe,
    NgIf
  ],
  templateUrl: './invitation-card.html',
  styleUrl: './invitation-card.css'
})
export class InvitationCard {
  @Input() invitation!: Invitation;
  @Input() showActions!: boolean;

  @Output() accept = new EventEmitter<number>();
  @Output() reject = new EventEmitter<number>();


  onAccept(): void {
    this.accept.emit(this.invitation.id);
  }

  onReject(): void {
    this.reject.emit(this.invitation.id);
  }
}
