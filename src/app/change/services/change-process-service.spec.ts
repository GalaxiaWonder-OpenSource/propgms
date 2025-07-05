import { TestBed } from '@angular/core/testing';

import { ChangeProcessService } from './change-process-service';

describe('ChangeProcessService', () => {
  let service: ChangeProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
