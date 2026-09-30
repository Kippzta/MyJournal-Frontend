import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Journal } from './components/journal/journal';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

    { path: 'register', component: Register },

    { path: 'login', component: Login}, 

    { path: 'journal-feed', component: Journal, canActivate: [authGuard] }, // lägger till authGuard för att skydda routes som kräver inloggninh

    { path: '', redirectTo: '/login', pathMatch: 'full' },

];
