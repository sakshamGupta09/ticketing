import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

function checkRoleAccess(allowedRoleIds: number[]): CanActivateFn {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    const userRoleId = authService.getLoginData()?.role_id;

    if (userRoleId && allowedRoleIds.includes(userRoleId)) {
      return true;
    }

    return router.parseUrl('/app/dashboard');
  };
}

export default checkRoleAccess;
