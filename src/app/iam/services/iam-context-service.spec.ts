import { TestBed } from '@angular/core/testing';

import { IamContextService } from './iam-context-service';

describe('IamContextService', () => {
  let service: IamContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IamContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
