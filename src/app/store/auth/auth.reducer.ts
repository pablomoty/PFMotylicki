import { createReducer, on } from "@ngrx/store";
import { Alumno } from "src/app/dashboard/pages/alumnos/models/modelalumno";
import { AuthActions } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
  authUser: Alumno | null;
}

const initialState: AuthState = {
  authUser: null,
}

export const authReducer = createReducer(initialState,
  on(AuthActions.setAuthUser, (currentState, action) => {

    return {
      authUser: action.data
    }
  })
)
