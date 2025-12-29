import { TestBed } from '@angular/core/testing';

import { Resumenes } from './resumenes';

describe('Resumenes', () => {
  let service: Resumenes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Resumenes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
