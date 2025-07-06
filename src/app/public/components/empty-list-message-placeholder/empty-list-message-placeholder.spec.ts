import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListMessagePlaceholder } from './empty-list-message-placeholder';

describe('EmptyListMessagePlaceholder', () => {
  let component: EmptyListMessagePlaceholder;
  let fixture: ComponentFixture<EmptyListMessagePlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyListMessagePlaceholder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyListMessagePlaceholder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
