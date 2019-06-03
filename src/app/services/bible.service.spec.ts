import { TestBed } from '@angular/core/testing';

import { BibleService } from './bible.service';
import { HttpClientModule } from '@angular/common/http';

describe('BibleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: BibleService = TestBed.get(BibleService);
    expect(service).toBeTruthy();
  });
});
