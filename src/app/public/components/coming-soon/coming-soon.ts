import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule
  ],
  templateUrl: './coming-soon.html',
  styleUrl: 'coming-soon.css',
})
export class ComingSoon {
  @Input() messagePath!: string;
}
