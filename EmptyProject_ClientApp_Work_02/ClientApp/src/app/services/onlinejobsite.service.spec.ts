import { TestBed } from '@angular/core/testing';

import { OnlinejobsiteService } from './onlinejobsite.service';

describe('OnlinejobsiteService', () => {
  let service: OnlinejobsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlinejobsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
