import { Component, Input } from '@angular/core';
import { ChangeProcess } from '../../model/change-process-entity';
import { ChangeProcessStatus } from '../../model/change-process-status';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-change-process-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    NgClass,
    TranslatePipe
  ],
  templateUrl: './change-process-card.html',
  styleUrl: './change-process-card.css'
})
export class ChangeProcessCard {
  @Input() changeProcess!: ChangeProcess;
  ChangeProcessStatus = ChangeProcessStatus;
}
