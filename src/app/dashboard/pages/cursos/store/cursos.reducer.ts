import { createFeature, createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { Cursos } from '../models';
import { CURSOS_MOCK } from '../mocks';

export const cursosFeatureKey = 'cursos';

export interface State {
  cursos: Cursos[],
  
}

export const initialState: State = {
  cursos: [],
 

};

export const reducer = createReducer(
  initialState,
  on(CursosActions.loadCursos, state => {
    return{...state,
      cursos: CURSOS_MOCK,
    }
  }),

);

export const cursosFeature = createFeature({
  name: cursosFeatureKey,
  reducer,
});

