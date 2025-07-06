import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingsTab } from './project-settings-tab';

describe('ProjectSettingsTab', () => {
  let component: ProjectSettingsTab;
  let fixture: ComponentFixture<ProjectSettingsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSettingsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSettingsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
