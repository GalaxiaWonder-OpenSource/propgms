import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDangerZone } from './project-danger-zone';

describe('ProjectDangerZone', () => {
  let component: ProjectDangerZone;
  let fixture: ComponentFixture<ProjectDangerZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDangerZone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDangerZone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
