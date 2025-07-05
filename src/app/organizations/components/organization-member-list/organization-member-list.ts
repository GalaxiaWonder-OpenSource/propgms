import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { EmptyListMessagePlaceholder } from '../../../public/components/empty-list-message-placeholder/empty-list-message-placeholder';
import { OrganizationMemberCard } from '../organization-member-card/organization-member-card';
import {OrganizationMember} from '../../model/organization-member-entity';

@Component({
  selector: 'app-organization-member-list',
  standalone: true,
  templateUrl: 'organization-member-list.html',
  styleUrl: 'organization-member-list.css',
  imports: [
    EmptyListMessagePlaceholder,
    OrganizationMemberCard
  ]
})
export class OrganizationMemberList {
  @Input() organizationMemberList: OrganizationMember[] = [];
  @Input() showActions!: boolean

  @Output() remove = new EventEmitter<number>();

  onRemove(id: number): void {
    this.remove.emit(id);
  }
}
