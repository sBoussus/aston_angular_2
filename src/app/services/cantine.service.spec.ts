import { TestBed } from '@angular/core/testing';

import { CantineService } from './cantine.service';

describe('CantineService', () => {
  let service: CantineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
