import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Organization} from '../../model/organization-entity';
import {TranslatePipe} from '@ngx-translate/core';
import {
  EmptyListMessagePlaceholder
} from '../../../public/components/empty-list-message-placeholder/empty-list-message-placeholder';
import {OrganizationCard} from '../organization-card/organization-card';

@Component({
  selector: 'app-organization-list',
  imports: [
    EmptyListMessagePlaceholder,
    OrganizationCard
  ],
  templateUrl: './organization-list.html',
  styleUrl: './organization-list.css'
})
export class OrganizationList {
  @Input() organizationList: Organization[] = [];
  @Output() click = new EventEmitter<Organization>();

  onClick(org: Organization): void {
    this.click.emit(org);
  }
}
