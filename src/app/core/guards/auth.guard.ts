import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const loginData = authService.getLoginData();

  if (loginData) {
    return true;
  }

  return router.parseUrl(`/auth/login?redirectUrl=${state.url}`);
};
