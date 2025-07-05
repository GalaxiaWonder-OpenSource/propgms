import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTab } from './schedule-tab';

describe('ScheduleTab', () => {
  let component: ScheduleTab;
  let fixture: ComponentFixture<ScheduleTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
