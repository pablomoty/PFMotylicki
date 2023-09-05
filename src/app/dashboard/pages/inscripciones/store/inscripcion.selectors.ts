import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscripcion from './inscripcion.reducer';

export const selectInscripcionState = createFeatureSelector<fromInscripcion.State>(
  fromInscripcion.inscripcionFeatureKey
);


export const selectInscripcions = createSelector(selectInscripcionState, (state) => state.data)

export const selectAlumnoOptions = createSelector(selectInscripcionState, (state) => state.alumnoOptions)
export const selectCursoOptions = createSelector(selectInscripcionState, (state) => state.cursoOptions)
