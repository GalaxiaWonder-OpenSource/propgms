import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberTab } from './organization-member-tab';

describe('OrganizationMemberTab', () => {
  let component: OrganizationMemberTab;
  let fixture: ComponentFixture<OrganizationMemberTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationMemberTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationMemberTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
