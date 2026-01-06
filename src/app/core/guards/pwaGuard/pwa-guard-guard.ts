import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { PwaInstallService } from '../../services/PwaInstallService/pwa-install-service';

export const pwaGuardGuard: CanActivateFn = (route, state) => {
  const pwaInstallService = inject(PwaInstallService);
  const router = inject(Router);

  if (pwaInstallService.isPWA()) {
    return true;
  } else {
    router.navigate(['install-instructions']);
    return false;
  }
};
