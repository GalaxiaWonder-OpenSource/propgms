import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationsTab } from './invitations-tab';

describe('InvitationsTab', () => {
  let component: InvitationsTab;
  let fixture: ComponentFixture<InvitationsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationsTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
