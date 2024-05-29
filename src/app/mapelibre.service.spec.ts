import { TestBed } from '@angular/core/testing';

import { MapelibreService } from './mapelibre.service';

describe('MapelibreService', () => {
  let service: MapelibreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapelibreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
