import { TestBed } from '@angular/core/testing';

import { LayoutEventService } from './layout-event-service';

describe('LayoutEventService', () => {
  let service: LayoutEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
