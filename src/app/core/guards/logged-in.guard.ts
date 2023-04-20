import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = () => {
  const router = inject(Router);

  return true;

  return router.parseUrl('/login');
};
