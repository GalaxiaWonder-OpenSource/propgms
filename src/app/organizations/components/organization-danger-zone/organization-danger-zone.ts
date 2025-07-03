import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialog } from '../../../public/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-organization-danger-zone',
  standalone: true,
  templateUrl: './organization-danger-zone.html',
  styleUrls: ['./organization-danger-zone.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ]
})
export class OrganizationDangerZone {
  @Output() deleteOrganization = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  confirmDelete(): void {
    this.dialog.open(ConfirmDialog, {
      data: {
        title: 'organizations.settings.delete.title',
        message: 'organizations.settings.delete.message'
      }
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteOrganization.emit();
      }
    });
  }
}
