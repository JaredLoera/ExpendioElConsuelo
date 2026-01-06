import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pwaGuardGuard } from './pwa-guard-guard';

describe('pwaGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pwaGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
