import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMilestoneModal } from './create-milestone-modal';

describe('CreateMilestoneModal', () => {
  let component: CreateMilestoneModal;
  let fixture: ComponentFixture<CreateMilestoneModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMilestoneModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMilestoneModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
