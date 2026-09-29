import { TestBed } from '@angular/core/testing';

import { Globalobjects } from './globalobjects';

describe('Globalobjects', () => {
  let service: Globalobjects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Globalobjects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
