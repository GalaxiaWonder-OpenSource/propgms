import { Component, OnInit } from '@angular/core';
import { BaseTab } from '../../../shared/components/base-tab';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { OrganizationMemberService } from '../../services/organization-member-service';
import {OrganizationMemberList} from "../../components/organization-member-list/organization-member-list";
import {InvitationList} from '../../components/invitation-list/invitation-list';
import {InvitationService} from '../../services/invitation-service';
import {OrganizationMember} from '../../model/organization-member-entity';
import {
  OrganizationMemberEntityFromResourceAssembler
} from '../../services/organization-member-entity-fron-resource-assembler';
import {Invitation} from '../../model/invitation-entity';
import {InvitationEntityFromResourceAssembler} from '../../services/invitation-entity-from-resource-assembler';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {InviteToOrganizationResource} from '../../resources/invite-to-organization-resource';
import {InviteToOrganizationModal} from '../../components/invite-to-organization-modal/invite-to-organization-modal';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {Organization} from '../../model/organization-entity';

@Component({
  selector: 'app-organization-member-tab',
  standalone: true,
  imports: [
    OrganizationMemberList,
    InvitationList,
    TranslatePipe,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './organization-member-tab.html',
  styleUrl: './organization-member-tab.css'
})
export class OrganizationMemberTab extends BaseTab implements OnInit {
  organizationMembers: OrganizationMember[] = [];
  isContractor: boolean = false;
  organizationInvitations: Invitation[] = [];

  constructor(
    layoutEvents: LayoutEventService,
    appContext: AppContextService,
    private memberService: OrganizationMemberService,
    private invitationService: InvitationService,
    private dialog: MatDialog
  ) {
    super(layoutEvents, appContext);
  }

  ngOnInit(): void {
    const organization = this.getOrganizationOrThrow();
    const personId = this.getPersonIdOrThrow();

    this.isContractor = organization.createdBy === personId

    this.memberService.getByOrganizationId(organization.id).subscribe({
      next: (members) => {
        this.organizationMembers = members.map(member =>
          OrganizationMemberEntityFromResourceAssembler(member)
        );
      },
      error: (err) => {
        console.error('Failed to load organization members:', err);
        this.emitSnackbar('error', 'organization.members.load-failure');
      }
    });

    this.reloadInvitations(organization);
  }

  // Introduced due to poorly backend use case management
  private reloadInvitations(organization: Organization) {
    this.invitationService.getByOrganizationId(organization.id).subscribe({
      next: (invitations) => {
        this.organizationInvitations = invitations.map(invitation =>
          InvitationEntityFromResourceAssembler(invitation)
        );
      },
      error: (err) => {
        console.error('Failed to fetch invitations by personId:', err);
      }
    });
  }

  handleRemove(id: number): void{
    this.memberService.removeByOrganizationMemberId(id).subscribe({
      next: () => {
        this.organizationMembers = this.organizationMembers.filter(member => member.id !== id);

        this.emitSnackbar("success", "organization.members.delete-success")
      },
      error: (err) => {
        console.error('Failed to load delete organization member:', err);
        this.emitSnackbar('error', 'organization.members.delete-failure');
      }
    });
  }

  openInviteToOrganizationModal() {
    const organization = this.getOrganizationOrThrow();

    const dialogRef = this.dialog.open(InviteToOrganizationModal);

    dialogRef.afterClosed().subscribe((result: { email: string } | undefined) => {
      if (result) {
        const resource: InviteToOrganizationResource = {
          organizationId: organization.id,
          email: result.email
        };

        this.invitationService.inviteByPersonEmailAndOrganizationId(resource).subscribe({
          next: (response) => {
            this.reloadInvitations(organization);
            this.emitSnackbar("success", "organization.members.invite-success");
          },
          error: () => {
            this.emitSnackbar("error", "organization.members.invite-failure");
          }
        });
      }
    });
  }

}
