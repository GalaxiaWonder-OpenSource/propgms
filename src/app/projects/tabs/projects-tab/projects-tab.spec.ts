import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTab } from './projects-tab';

describe('ProjectsTab', () => {
  let component: ProjectsTab;
  let fixture: ComponentFixture<ProjectsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
