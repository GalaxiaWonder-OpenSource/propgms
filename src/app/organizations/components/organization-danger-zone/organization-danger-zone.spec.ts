import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDangerZone } from './organization-danger-zone';

describe('OrganizationDangerZone', () => {
  let component: OrganizationDangerZone;
  let fixture: ComponentFixture<OrganizationDangerZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationDangerZone]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationDangerZone);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
