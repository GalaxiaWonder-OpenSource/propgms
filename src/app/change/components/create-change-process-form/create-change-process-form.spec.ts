import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChangeProcessForm } from './create-change-process-form';

describe('CreateChangeProcessForm', () => {
  let component: CreateChangeProcessForm;
  let fixture: ComponentFixture<CreateChangeProcessForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChangeProcessForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChangeProcessForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
