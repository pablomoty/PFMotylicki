import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { CursosActions } from './cursos.actions';

@Injectable()
export class CursosEffects {


  loadCursoss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursosActions.loadCursos),

      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
