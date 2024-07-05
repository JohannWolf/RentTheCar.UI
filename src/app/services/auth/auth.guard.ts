import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const requiredRole = route.data?.['requiredRole'];

  if (authService.isLoggedIn()) {
    const user = authService.getUser();
    if (!requiredRole || user?.role.includes(requiredRole)) {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
