import { Routes } from '@angular/router';

export const HEROES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/heroes-page/heroes-page').then((m) => m.HeroesPage),
    },
    {
        path: 'new',
        loadComponent: () => import('./pages/hero-form-page/hero-form-page').then((m) => m.HeroFormPage),
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./pages/hero-form-page/hero-form-page').then((m) => m.HeroFormPage),
    },
    {
        path: ':id',
        loadComponent: () => import('./pages/hero-form-page/hero-form-page').then((m) => m.HeroFormPage),
    },

]