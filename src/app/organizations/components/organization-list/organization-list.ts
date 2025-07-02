import {Component, Input} from '@angular/core';
import {Organization} from '../../model/organization-entity';
import {TranslatePipe} from '@ngx-translate/core';
import {
  EmptyListMessagePlaceholderComponent
} from '../../../public/components/empty-list-message-placeholder/empty-list-message-placeholder';
import {OrganizationCard} from '../organization-card/organization-card';

@Component({
  selector: 'app-organization-list',
  imports: [
    TranslatePipe,
    EmptyListMessagePlaceholderComponent,
    OrganizationCard
  ],
  templateUrl: './organization-list.html',
  styleUrl: './organization-list.css'
})
export class OrganizationList {
  @Input() organizationList: Organization[] = [];
}
