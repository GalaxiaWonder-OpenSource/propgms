import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberCard } from './organization-member-card';

describe('OrganizationMemberCard', () => {
  let component: OrganizationMemberCard;
  let fixture: ComponentFixture<OrganizationMemberCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationMemberCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationMemberCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
