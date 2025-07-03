import { Component, OnInit } from '@angular/core';
import { BaseTab } from '../../../shared/components/base-tab';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { OrganizationMemberService } from '../../services/organization-member-service';
import { OrganizationMemberResource } from '../../resources/organization-member-resource';
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

@Component({
  selector: 'app-organization-member-tab',
  standalone: true,
  imports: [
    OrganizationMemberList,
    InvitationList,
    TranslatePipe
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
    private invitationService: InvitationService
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
}
