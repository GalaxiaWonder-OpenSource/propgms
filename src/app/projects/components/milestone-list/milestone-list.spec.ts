import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneList } from './milestone-list';

describe('MilestoneList', () => {
  let component: MilestoneList;
  let fixture: ComponentFixture<MilestoneList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MilestoneList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilestoneList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
