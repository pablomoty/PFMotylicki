import { createActionGroup, props } from "@ngrx/store";
import { Usuario } from "src/app/dashboard/pages/usuarios/models/modelusuario";


export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    
    'setAuthUser': props<{ data: Usuario | null }>()
  }
})
