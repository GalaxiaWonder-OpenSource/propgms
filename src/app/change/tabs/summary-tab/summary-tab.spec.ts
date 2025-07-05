import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTab } from './summary-tab';

describe('ChangeProcessTab', () => {
  let component: SummaryTab;
  let fixture: ComponentFixture<SummaryTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
