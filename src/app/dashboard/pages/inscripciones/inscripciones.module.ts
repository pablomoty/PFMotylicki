import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { FormularioinscripcionesComponent } from './formularioinscripciones/formularioinscripciones/formularioinscripciones.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionEffects } from './store/inscripcion.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionFeature } from './store/inscripcion.reducer';



@NgModule({
  declarations: [
    InscripcionesComponent,
    FormularioinscripcionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionFeature),
    EffectsModule.forFeature([InscripcionEffects]),

    
    
  ]
})
export class InscripcionesModule { }
