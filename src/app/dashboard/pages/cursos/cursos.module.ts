import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './store/cursos.effects';
import { StoreModule } from '@ngrx/store';
import { cursosFeature } from './store/cursos.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(cursosFeature),
    EffectsModule.forFeature([CursosEffects])
  ],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
