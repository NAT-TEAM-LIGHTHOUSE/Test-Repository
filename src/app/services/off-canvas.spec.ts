import { TestBed } from '@angular/core/testing';

import { OffCanvas } from './off-canvas';

describe('OffCanvas', () => {
  let service: OffCanvas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffCanvas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
