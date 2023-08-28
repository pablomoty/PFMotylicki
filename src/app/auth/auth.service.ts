import { Injectable } from "@angular/core";
import { LogueoAlumno } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { Alumno } from "../dashboard/pages/alumnos/models/modelalumno";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<Alumno | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient) {}


  autenticacion(): Observable<boolean> {
    return this.authUser$.pipe(
      take(1),
      map((user) => !!user),
    );
  }

  login(logueo: LogueoAlumno): void {
    this.httpClient.get<Alumno[]>('http://localhost:3000/alumnos', {
      params: {
        email: logueo.email || '',
        password: logueo.apellido || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          
          this._authUser$.next(response[0]);
          this.router.navigate(['/dashboard']);
        } else {
          
          this.notifier.showError('Email o contrasena invalida');
          this._authUser$.next(null);
        }
      },
    })
   
}
}
