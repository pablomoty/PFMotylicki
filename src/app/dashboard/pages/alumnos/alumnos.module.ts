import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { FormularioalumnosComponent } from './formularioalumnos/formularioalumnos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';




@NgModule({
  declarations: [
    AlumnosComponent,
    FormularioalumnosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosRoutingModule
    
  ]
})
export class AlumnosModule { }
