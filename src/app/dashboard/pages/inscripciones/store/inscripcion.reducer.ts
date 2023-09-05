import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionActions } from './inscripcion.actions';
import { InscripcionCursoMasAlumno } from '../models';
import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';

export const inscripcionFeatureKey = 'inscripcion';

export interface State {
  data: InscripcionCursoMasAlumno[];
  alumnoOptions: Alumno[];
  cursoOptions: Curso[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  alumnoOptions: [],
  cursoOptions: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,



  on(InscripcionActions.loadInscripciones, state => {
    return {
      ...state,
      loading: true
    }
  }),


  on(InscripcionActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),


  on(InscripcionActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }),



  on(InscripcionActions.loadAlumnoOptions, (state) => state),
  on(InscripcionActions.loadAlumnoOptionsSuccess, (state, action) => {
    return {
      ...state,
      alumnoOptions: action.data,
    }
  }),

  
  on(InscripcionActions.loadCursoOptions, (state) => state),
  on(InscripcionActions.loadCursoOptionsSuccess, (state, action) => {
    return {
      ...state,
      productOptions: action.data,
    }
  })

);

export const inscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});


