import {Component, Input} from '@angular/core';
import {Organization} from '../../model/organization-entity';
import {MatCardModule} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-organization-card',
  imports: [
    MatCardModule,
    MatIconModule,
    TranslatePipe,
    NgClass,
    DatePipe
  ],
  templateUrl: './organization-card.html',
  styleUrl: './organization-card.css'
})
export class OrganizationCard {
  @Input() organization!: Organization
}
