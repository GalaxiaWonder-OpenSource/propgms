import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProcessCard } from './change-process-card';

describe('ChangeProcessCard', () => {
  let component: ChangeProcessCard;
  let fixture: ComponentFixture<ChangeProcessCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeProcessCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeProcessCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
