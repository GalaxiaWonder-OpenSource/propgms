import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToOrganizationModal } from './invite-to-organization-modal';

describe('InviteToOrganizationModal', () => {
  let component: InviteToOrganizationModal;
  let fixture: ComponentFixture<InviteToOrganizationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InviteToOrganizationModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteToOrganizationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
