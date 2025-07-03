import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationMemberList } from './organization-member-list';

describe('OrganizationMemberList', () => {
  let component: OrganizationMemberList;
  let fixture: ComponentFixture<OrganizationMemberList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationMemberList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationMemberList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
