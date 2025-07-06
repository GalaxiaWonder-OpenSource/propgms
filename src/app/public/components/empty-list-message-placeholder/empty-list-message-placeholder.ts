import { Component, Input } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-empty-list-message-placeholder',
  standalone: true,
  templateUrl: './empty-list-message-placeholder.html',
  imports: [
    TranslatePipe,
    MatIconModule,
    MatCardModule
  ],
  styleUrls: ['./empty-list-message-placeholder.css']
})
export class EmptyListMessagePlaceholder {
  @Input() layout!: string;
  @Input() tab!: string;

  get translationKey(): string {
    return `${this.layout}.${this.tab}.empty-list-message`;
  }
}
