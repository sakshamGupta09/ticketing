import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const loginData = authService.getLoginData();

  if (!loginData) {
    return true;
  }

  return router.parseUrl('/app/dashboard');
};
