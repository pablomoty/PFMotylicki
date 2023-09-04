import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUsuario = createSelector(selectAuthState, (state) => state.authUsuario);

export const selectEsAdmin = createSelector(selectAuthState, (state) => state.authUsuario?.rol === 'ADMIN')