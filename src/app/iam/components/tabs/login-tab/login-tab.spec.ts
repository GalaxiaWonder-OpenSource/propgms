import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTab } from './login-tab';

describe('LoginTab', () => {
  let component: LoginTab;
  let fixture: ComponentFixture<LoginTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
