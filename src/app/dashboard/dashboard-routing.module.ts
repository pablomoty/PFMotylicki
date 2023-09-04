import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { CursosComponent } from './pages/cursos/cursos.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'alumnos',
        component: AlumnosComponent
      },
      {
        path: 'cursos',
        component: CursosComponent,
        loadChildren: () => import('./pages/cursos/cursos.module').then((m) => m.CursosModule),
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
