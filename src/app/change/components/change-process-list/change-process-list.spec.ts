import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProcessList } from './change-process-list';

describe('ChangeProcessList', () => {
  let component: ChangeProcessList;
  let fixture: ComponentFixture<ChangeProcessList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeProcessList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeProcessList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
