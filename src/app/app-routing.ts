import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards';
import { MantenimientoDocenteComponent } from './paginas/mantenimiento-docente/mantenimiento-docente.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard], // Protege la ruta principal
    loadComponent: () => import('./paginas/home/home.component'),
  },
  {
    path: 'mantemiento-docente',
    canActivate: [authGuard], // Protege la ruta de mantenimiento-docente
    loadComponent: () => import('./paginas/mantenimiento-docente/mantenimiento-docente.component').then(m => m.MantenimientoDocenteComponent),

  },
  {
    path: 'mantemiento-estudiante',
    canActivate: [authGuard], // Protege la ruta de mantenimiento-estudiante
    loadComponent: () => import('./paginas/mantenimiento-estudiante/mantenimiento-estudiante.component').then(m => m.MantenimientoEstudianteComponent),

  },
  {
    path: 'auth',
    canActivate: [publicGuard], // Solo pueden acceder los no autenticados
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./paginas/auth/sign-up/sign-up.component'),
      },
      {
        path: 'log-in',
        loadComponent: () => import('./paginas/auth/log-in/log-in.component'),
      },
      
    ],
  },
];

