import { createReducer, on } from "@ngrx/store";
import { Usuario } from "src/app/dashboard/pages/usuarios/models/modelusuario";
import { AuthActions } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
  authUsuario: Usuario | null;
}

const initialState: AuthState = {
  authUsuario: null,
}

export const authReducer = createReducer(initialState,
  on(AuthActions.setAuthUsuario, (currentState, action) => {

    return {
      authUsuario: action.data
    }
  })
)
