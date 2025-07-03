import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe, NgClass } from '@angular/common';

import {OrganizationMember} from '../../model/organization-member-entity';
import {MatButtonModule} from '@angular/material/button';
import {OrganizationMemberType} from '../../model/organization-member-type';
import {ConfirmDialog} from '../../../public/components/confirm-dialog/confirm-dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-organization-member-card',
  standalone: true,
  templateUrl: './organization-member-card.html',
  styleUrl: './organization-member-card.css',
  imports: [
    MatCardModule,
    MatIconModule,
    TranslatePipe,
    NgClass,
    DatePipe,
    MatButtonModule
  ]
})
export class OrganizationMemberCard {
  @Input() organizationMember!: OrganizationMember;
  @Input() showActions!: boolean
  @Output() remove = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

  confirmRemoval(): void {
    this.dialog.open(ConfirmDialog, {
      data: {
        title: 'organization.members.remove.title',
        message: 'organization.members.remove.message'
      }
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.remove.emit(this.organizationMember.id);
      }
    });
  }

  protected readonly OrganizationMemberType = OrganizationMemberType;
}
