import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { HomeComponent } from '../home/home.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'alumnos',
        component: AlumnosComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '**',
        redirectTo: 'alumnos'
      }
    ])
  ],
  exports: [RouterModule],
})
export class AlumnosRoutingModule { }
