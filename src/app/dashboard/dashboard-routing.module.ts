import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { adminGuard } from '../core/services/guards/admin.guard';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'usuarios',
        canActivate: [adminGuard],
        component: UsuariosComponent
      },
      {
        path: 'cursos',
        component: CursosComponent,
        loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule),
      },
      {
        path: 'alumnos',
        loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule),
      },
      {
        path: 'inscripciones',
        loadChildren: () => import('./pages/inscripciones/inscripciones.module').then((m) => m.InscripcionesModule)
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
