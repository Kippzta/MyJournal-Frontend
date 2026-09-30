import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';


// Körs automatiskt av Angular när användaren försöker navigera till en route som är skyddad av authGuard
export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(Auth);

  const router = inject(Router);

  if (auth.isLoggedIn()){

    return true;

  }

  router.navigate(['/login']);
  return false;

  
};
