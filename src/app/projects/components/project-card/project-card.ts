import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Project} from '../../model/project-entity';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, TranslatePipe, DatePipe],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCard {
  @Input() project!: Project;
  @Output() click = new EventEmitter<Project>();

  onClick() {
    this.click.emit(this.project);
  }
}
