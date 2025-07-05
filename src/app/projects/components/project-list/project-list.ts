import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../model/project-entity';
import { EmptyListMessagePlaceholderComponent } from '../../../public/components/empty-list-message-placeholder/empty-list-message-placeholder';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    EmptyListMessagePlaceholderComponent,
    ProjectCard
  ],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css'
})
export class ProjectList {
  @Input() projectList: Project[] = [];
  @Input() layout!: string;
  @Output() click = new EventEmitter<Project>();

  onClick(project: Project): void {
    this.click.emit(project);
  }
}
