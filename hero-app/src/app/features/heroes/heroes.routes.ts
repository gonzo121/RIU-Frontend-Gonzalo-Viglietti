import { Routes } from '@angular/router';

export const HEROES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/heroes-page/heroes-page').then((m) => m.HeroesPage),
    },
]