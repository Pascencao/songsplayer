import { TestBed } from '@angular/core/testing';

import { ApiCommsService } from './api-comms.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiCommsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ApiCommsService = TestBed.get(ApiCommsService);
    expect(service).toBeTruthy();
  });
});
