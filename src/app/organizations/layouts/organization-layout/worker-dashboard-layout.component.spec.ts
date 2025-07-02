import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDashboardLayout } from './worker-dashboard-layout.component';

describe('OrganizationLayout', () => {
  let component: WorkerDashboardLayout;
  let fixture: ComponentFixture<WorkerDashboardLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerDashboardLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDashboardLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
