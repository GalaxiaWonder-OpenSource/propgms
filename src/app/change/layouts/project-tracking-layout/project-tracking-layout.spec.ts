import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTrackingLayout } from './project-tracking-layout';

describe('ProjectTrackingLayout', () => {
  let component: ProjectTrackingLayout;
  let fixture: ComponentFixture<ProjectTrackingLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTrackingLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTrackingLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
