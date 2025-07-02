import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { BaseTab } from '../../../shared/components/base-tab';

import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { InvitationService } from '../../services/invitation-service';

import { InvitationResource } from '../../resources/invitation-resource';
import { Invitation } from '../../model/invitation-entity';
import { InvitationEntityFromResourceAssembler } from '../../services/invitation-entity-from-resource-assembler';
import { InvitationList } from '../../components/invitation-list/invitation-list';

@Component({
  selector: 'app-invitations-tab',
  standalone: true,
  imports: [TranslatePipe, InvitationList],
  templateUrl: './invitations-tab.html',
  styleUrl: './invitations-tab.css'
})
export class InvitationsTab extends BaseTab implements OnInit {
  invitationsList: Invitation[] = [];

  constructor(
    layoutEvents: LayoutEventService,
    appContextService: AppContextService,
    private invitationService: InvitationService
  ) {
    super(layoutEvents, appContextService);
  }

  ngOnInit(): void {
    const personId = this.getPersonIdOrThrow();

    this.invitationService.getByPersonId(personId).subscribe({
      next: (invitations) => {
        if (!invitations || invitations.length === 0) {
          this.invitationsList = [];
          console.warn('No invitations returned from backend for current user.');
          return;
        }

        this.invitationsList = invitations.map(inv =>
          InvitationEntityFromResourceAssembler(inv)
        );
      },
      error: (err) => {
        console.error('Failed to fetch invitations by personId:', err);
      }
    });
  }

  handleAccept(invitationId: number): void {
    this.invitationService.acceptInvitationById(invitationId).subscribe({
      next: () => {
        this.emitSnackbar("success", "worker.invitations.accept-success");
        this.removeInvitationById(invitationId);
      },
      error: (err) => {
        console.error('Failed to accept invitation by id:', err);
        this.emitSnackbar("error", "worker.invitations.failure");
      }
    });
  }

  handleReject(invitationId: number): void {
    this.invitationService.rejectInvitationById(invitationId).subscribe({
      next: () => {
        this.emitSnackbar("info", "worker.invitations.reject-success");
        this.removeInvitationById(invitationId);
      },
      error: (err) => {
        console.error('Failed to reject invitation by id:', err);
        this.emitSnackbar("error", "worker.invitations.failure");
      }
    });
  }

  removeInvitationById(invitationId: number): void {
    this.invitationsList = this.invitationsList.filter(inv => inv.id !== invitationId);
  }
}
