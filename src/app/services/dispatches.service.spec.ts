import { TestBed, inject } from '@angular/core/testing';

import { DispatchesService } from './dispatches.service';

describe('DispatchesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DispatchesService]
    });
  });

  it('should be created', inject([DispatchesService], (service: DispatchesService) => {
    expect(service).toBeTruthy();
  }));
});
