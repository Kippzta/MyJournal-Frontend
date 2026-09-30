import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';

export const routes: Routes = [
    { path: 'register', component: Register },

    { path: 'login', component: Login}, 

    // { path: 'journal-feed', component: Journal, canActivate: [authGuard] }, // här kan jag lägga till authGuard för att skydda routes som kräver inloggninh

    { path: '', redirectTo: 'register', pathMatch: 'full' },
];
