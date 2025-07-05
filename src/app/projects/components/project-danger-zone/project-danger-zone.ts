import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialog } from '../../../public/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-project-danger-zone',
  standalone: true,
  templateUrl: './project-danger-zone.html',
  styleUrls: ['./project-danger-zone.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe
  ]
})
export class ProjectDangerZone {
  @Output() deleteProject = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  confirmDelete(): void {
    this.dialog.open(ConfirmDialog, {
      data: {
        title: 'project.settings.delete.title',
        message: 'project.settings.delete.message'
      }
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteProject.emit();
      }
    });
  }
}
