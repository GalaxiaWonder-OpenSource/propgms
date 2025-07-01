import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTab } from './register-tab';

describe('RegisterTab', () => {
  let component: RegisterTab;
  let fixture: ComponentFixture<RegisterTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
