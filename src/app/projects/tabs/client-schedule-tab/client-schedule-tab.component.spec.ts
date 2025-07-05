import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientScheduleTab } from './client-schedule-tab.component';

describe('ScheduleTab', () => {
  let component: ClientScheduleTab;
  let fixture: ComponentFixture<ClientScheduleTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientScheduleTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientScheduleTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
