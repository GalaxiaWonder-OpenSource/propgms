import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProcessTab } from './change-process-tab';

describe('ChangeProcessTab', () => {
  let component: ChangeProcessTab;
  let fixture: ComponentFixture<ChangeProcessTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeProcessTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeProcessTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
