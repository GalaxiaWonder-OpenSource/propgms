import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganizationForm } from './edit-organization-form';

describe('EditOrganizationForm', () => {
  let component: EditOrganizationForm;
  let fixture: ComponentFixture<EditOrganizationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOrganizationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOrganizationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
