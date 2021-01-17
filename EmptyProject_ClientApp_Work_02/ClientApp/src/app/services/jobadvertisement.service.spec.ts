import { TestBed } from '@angular/core/testing';

import { JobadvertisementService } from './jobadvertisement.service';

describe('JobadvertisementService', () => {
  let service: JobadvertisementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobadvertisementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
