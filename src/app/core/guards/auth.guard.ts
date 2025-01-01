import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { map } from 'rxjs';

export const routerInjection = () => inject(Router);

export const authStateObs$ = () => inject(AuthService).authState$;

export const authGuard: CanActivateFn = () => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if (!user) {
        // Redirige a la página de login y pasa el parámetro 'returnUrl'
        router.navigate(['auth/log-in'], { queryParams: { returnUrl: router.url } });
        return false;
      }
      return true;
    })
  );
};

export const publicGuard: CanActivateFn = () => {
  const router = routerInjection();

  return authStateObs$().pipe(
    map((user) => {
      if (user) {
        // Si el usuario está autenticado, redirige a la página de inicio
        router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
};
