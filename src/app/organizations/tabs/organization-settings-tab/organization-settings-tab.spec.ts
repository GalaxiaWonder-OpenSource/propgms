import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSettingsTab } from './organization-settings-tab';

describe('OrganizationSettingsTab', () => {
  let component: OrganizationSettingsTab;
  let fixture: ComponentFixture<OrganizationSettingsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationSettingsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationSettingsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
