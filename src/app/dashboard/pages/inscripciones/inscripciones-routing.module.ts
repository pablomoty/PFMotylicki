import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InscripcionesComponent } from './inscripciones.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InscripcionesComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class InscripcionesRoutingModule { }
