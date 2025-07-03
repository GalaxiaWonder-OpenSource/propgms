import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsTab } from './organizations-tab';

describe('OrganizationsTab', () => {
  let component: OrganizationsTab;
  let fixture: ComponentFixture<OrganizationsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
