import { Component, OnInit } from '@angular/core';
import { BaseTab } from '../../../shared/components/base-tab';
import { LayoutEventService } from '../../../shared/services/layout-event-service';
import { AppContextService } from '../../../shared/services/app-context-service';
import { OrganizationMemberService } from '../../services/organization-member-service';
import { OrganizationMemberResource } from '../../resources/organization-member-resource';
import {OrganizationMemberList} from "../../components/organization-member-list/organization-member-list";

@Component({
  selector: 'app-organization-member-tab',
  standalone: true,
  imports: [
    OrganizationMemberList
  ],
  templateUrl: './organization-member-tab.html',
  styleUrl: './organization-member-tab.css'
})
export class OrganizationMemberTab extends BaseTab implements OnInit {
  organizationMembers: OrganizationMemberResource[] = [];
  isContractor: boolean = false;

  constructor(
    layoutEvents: LayoutEventService,
    appContext: AppContextService,
    private memberService: OrganizationMemberService
  ) {
    super(layoutEvents, appContext);
  }

  ngOnInit(): void {
    const organization = this.getOrganizationOrThrow();
    const personId = this.getPersonIdOrThrow();

    this.isContractor = organization.createdBy === personId

    this.memberService.getByOrganizationId(organization.id).subscribe({
      next: (members) => {
        this.organizationMembers = members;
      },
      error: (err) => {
        console.error('Failed to load organization members:', err);
        this.emitSnackbar('error', 'organization.members.load-failure');
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
