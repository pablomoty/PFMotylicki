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

      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO InscripcionActions.loadInscripcions
      ofType(InscripcionActions.loadInscripciones),


      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getInscripcionsFromDB().pipe(

          // SI TODO SALE BIEN....
          map(data => InscripcionActions.loadInscripcionesSuccess({ data })),


          // SI TODO SALE MAL...
          catchError(error => of(InscripcionActions.loadInscripcionesFailure({ error }))))
      )
    );
  });

  loadAlumnoOptions$ = createEffect(() => {
    return this.actions$.pipe(

      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO InscripcionActions.loadInscripcions
      ofType(InscripcionActions.loadAlumnoOptions),


      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getAlumnoOptions().pipe(

          // SI TODO SALE BIEN....
          map(data => InscripcionActions.loadAlumnoOptionsSuccess({ data })),


          // SI TODO SALE MAL...
          catchError(error => of(InscripcionActions.loadAlumnoOptionsFailure({ error }))))
      )
    );
  });

  loadProductOptions$ = createEffect(() => {
    return this.actions$.pipe(

      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO InscripcionActions.loadInscripcions
      ofType(InscripcionActions.loadCursoOptions),


      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getProductOptions().pipe(

          // SI TODO SALE BIEN....
          map(data => InscripcionActions.loadCursoOptionsSuccess({ data })),


          // SI TODO SALE MAL...
          catchError(error => of(InscripcionActions.loadCursoOptionsFailure({ error }))))
      )
    );
  });


  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(

      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO InscripcionActions.loadInscripcions
      ofType(InscripcionActions.createInscripcion),


      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createInscripcion(action.payload).pipe(

          // SI TODO SALE BIEN....
          map(data => InscripcionActions.createInscripcionSuccess({ data })),


          // SI TODO SALE MAL...
          catchError(error => of(InscripcionActions.createInscripcionFailure({ error }))))
      )
    );
  });

  createInscripcionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      // SOLO FILTRO AQUELLAS ACCIONES QUE SEAN DE TIPO InscripcionActions.loadInscripcions
      ofType(InscripcionActions.createInscripcionSuccess),
      map(() => this.store.dispatch(InscripcionActions.loadInscripciones()))
    );
  }, { dispatch: false });


  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

  private getInscripcionsFromDB(): Observable<InscripcionCursoMasAlumno[]> {
    return this.httpClient.get<InscripcionCursoMasAlumno[]>(environment.baseApiUrl + '/inscripciones?_expand=curso&_expand=alumno')
  }

  private getAlumnoOptions(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(environment.baseApiUrl + '/alumnos')
  }

  private getProductOptions(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(environment.baseApiUrl + '/cursos');
  }

  private createInscripcion(payload: CreateInscripcionPayload): Observable<Inscripcion> {
    return this.httpClient.post<Inscripcion>(environment.baseApiUrl + '/inscripciones', payload)
  }
}
