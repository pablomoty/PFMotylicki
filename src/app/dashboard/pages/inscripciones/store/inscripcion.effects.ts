import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { HttpClient } from '@angular/common/http';
import { CreateInscripcionPayload, Inscripcion, InscripcionCursoMasAlumno } from '../models';
import { environment } from 'src/environments/environment';
import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';
import { Store } from '@ngrx/store';


@Injectable()
export class InscripcionEffects {

  loadInscripcions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.loadInscripciones),


      concatMap(() =>
        this.getInscripcionsFromDB().pipe(
          map(data => InscripcionActions.loadInscripcionesSuccess({ data })),

          catchError(error => of(InscripcionActions.loadInscripcionesFailure({ error }))))
      )
    );
  });

  loadAlumnoOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.loadAlumnoOptions),


      concatMap(() =>
        this.getAlumnoOptions().pipe(

          map(data => InscripcionActions.loadAlumnoOptionsSuccess({ data })),

          catchError(error => of(InscripcionActions.loadAlumnoOptionsFailure({ error }))))
      )
    );
  });

  loadCursoOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.loadCursoOptions),


      concatMap(() =>
        this.getCursoOptions().pipe(

       
          map(data => InscripcionActions.loadCursoOptionsSuccess({ data })),

          catchError(error => of(InscripcionActions.loadCursoOptionsFailure({ error }))))
      )
    );
  });


  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.createInscripcion),


      concatMap((action) =>

        this.createInscripcion(action.payload).pipe(

          map(data => InscripcionActions.createInscripcionSuccess({ data })),

          catchError(error => of(InscripcionActions.createInscripcionFailure({ error }))))
      )
    );
  });

  createInscripcionSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionActions.createInscripcionSuccess),
      map(() => this.store.dispatch(InscripcionActions.loadInscripciones()))
    );
  }, { dispatch: false });


  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

  private getInscripcionsFromDB(): Observable<InscripcionCursoMasAlumno[]> {
    return this.httpClient.get<InscripcionCursoMasAlumno[]>(environment.baseApiUrl + '/inscripcion?_expand=cursos&_expand=alumnos')
  }

  private getAlumnoOptions(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(environment.baseApiUrl + '/alumnos')
  }

  private getCursoOptions(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(environment.baseApiUrl + '/cursos');
  }

  private createInscripcion(payload: CreateInscripcionPayload): Observable<Inscripcion> {
    return this.httpClient.post<Inscripcion>(environment.baseApiUrl + '/inscripcion', payload)
  }
}
