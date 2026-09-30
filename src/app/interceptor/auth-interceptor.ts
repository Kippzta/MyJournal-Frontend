import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';


 //Körs automatiskt av Angular på varje utgående HTTP-anrop
 //Lägger till Basic Auth-headern om användaren är inloggad, annars skickas
 //anropet vidare oförändrat.
 
export const authInterceptor: HttpInterceptorFn = (req, next) => {


  // Hämtar Auth service och kollar om användaren är inloggad
  const auth = inject(Auth);
  const credentials = auth.credentials();

  // Om inga inloggningsuppgifter finns, skicka anropet t1ill backend
  if (credentials === null) {

    return next(req);
    
  }

  // Om användaren är inloggad, kopirerar requesten till en ny med Basic Auth headern ifylld
  // och skicka den till backend
  const authReq = req.clone({

    setHeaders: { Authorization: auth.buildAuthHeader(credentials) },

  });

  return next(authReq);
};
