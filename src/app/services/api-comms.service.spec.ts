import { TestBed } from '@angular/core/testing';

import { ApiCommsService } from './api-comms.service';

describe('ApiCommsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCommsService = TestBed.get(ApiCommsService);
    expect(service).toBeTruthy();
  });
});
