import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CursosComponent } from './pages/cursos/cursos.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
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
