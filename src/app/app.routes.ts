import { Routes } from '@angular/router';
import { Register } from './components/register/register';

export const routes: Routes = [
    { path: 'register', component: Register },

    // { path: 'login', component: Login},

    { path: '', redirectTo: 'register', pathMatch: 'full' },
];
