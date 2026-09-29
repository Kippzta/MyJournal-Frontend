import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Skapar en förutästtning så att där Httpclient injectas så kommer att använda 
    // authInterceptor för att skicka med Basic Auth headern i varje request.
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
