import { Injectable } from "@angular/core";
import { LogueoAlumno } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { Alumno } from "../dashboard/pages/alumnos/models/modelalumno";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth/auth.actions";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<Alumno | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient, private store:Store) {}


  autenticacion(): Observable<boolean> {
    return this.httpClient.get<Alumno[]>(environment.baseApiUrl + '/alumnos', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((usersResult) => {
        if (usersResult.length) {
          const authUser = usersResult[0];
          this.store.dispatch(AuthActions.setAuthUser({ data: authUser }));
        }

        return !!usersResult.length
      })
    )
  }

  login(logueo: LogueoAlumno): void {
    this.httpClient.get<Alumno[]>('http://localhost:3000/alumnos', {
      params: {
        email: logueo.email || '',
        password: logueo.apellido || '',
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          /* this._authUser$.next(response[0]); */
          this.store.dispatch(AuthActions.setAuthUser({ data: authUser }));
          this.router.navigate(['/dashboard']);
        } else {
          
          this.notifier.showError('Email o contrasena invalida');
          this._authUser$.next(null);
        }
      },
    })
   
}
}
