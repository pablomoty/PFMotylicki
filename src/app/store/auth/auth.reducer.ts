import { createReducer, on } from "@ngrx/store";
import { Usuario } from "src/app/dashboard/pages/usuarios/models/modelusuario";
import { AuthActions } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
  authUser: Usuario | null;
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
