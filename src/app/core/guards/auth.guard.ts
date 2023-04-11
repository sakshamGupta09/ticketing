import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Router);
  const router = inject(Router);

  return true;

  return router.parseUrl('/login');
};
