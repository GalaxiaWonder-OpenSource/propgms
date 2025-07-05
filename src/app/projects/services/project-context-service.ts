import { Injectable } from '@angular/core';
import { Project } from '../model/project-entity';

const PROJECT_DATA_KEY = 'selected_project';

@Injectable({
  providedIn: 'root'
})
export class ProjectContextService {
  private selectedProject: Project | null = null;

  constructor() {
    this.selectedProject = this.getStoredProject();
  }

  setSelected(project: Project): void {
    this.selectedProject = project;
    localStorage.setItem(PROJECT_DATA_KEY, JSON.stringify(project));
  }

  getSelected(): Project | null {
    return this.selectedProject;
  }

  clear(): void {
    this.selectedProject = null;
    localStorage.removeItem(PROJECT_DATA_KEY);
  }

  private getStoredProject(): Project | null {
    const raw = localStorage.getItem(PROJECT_DATA_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
