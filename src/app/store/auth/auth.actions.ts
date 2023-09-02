import { createActionGroup, props } from "@ngrx/store";
import { Alumno } from "src/app/dashboard/pages/alumnos/models/modelalumno";


export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    
    'setAuthUser': props<{ data: Alumno | null }>()
  }
})
