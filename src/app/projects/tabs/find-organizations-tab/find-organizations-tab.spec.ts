import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindOrganizationsTab } from './find-organizations-tab';

describe('FindOrganizationsTab', () => {
  let component: FindOrganizationsTab;
  let fixture: ComponentFixture<FindOrganizationsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindOrganizationsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindOrganizationsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
