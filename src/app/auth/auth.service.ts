import { Injectable } from "@angular/core";
import { LogueoUsuario } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { Usuario } from "../dashboard/pages/usuarios/models/modelusuario";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth/auth.actions";
import { selectAuthUser } from "../store/auth/auth.selector";

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authUser$ = this.store.select(selectAuthUser);

  constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient, private store:Store) {}


  autenticacion(): Observable<boolean> {
    return this.httpClient.get<Usuario[]>(environment.baseApiUrl + '/usuarios', {
      params: {
       
      }
    }).pipe(
      map((usersResult) => {
        if (usersResult.length) {
          const authUser = usersResult[0]
          this.store.dispatch(AuthActions.setAuthUser({ data: authUser }));
        }

        return !!usersResult.length
      })
    )
  }

  login(logueo: LogueoUsuario): void {
    this.httpClient.get<Usuario[]>(environment.baseApiUrl + '/usuarios', {
      params: {
        email: logueo.email || '',
        password: logueo.password || '', 
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          this.store.dispatch(AuthActions.setAuthUser({ data: authUser }));
          this.router.navigate(['/dashboard']);
        } else {
          
          this.notifier.showError('Email o contrasena invalida');
          this.store.dispatch(AuthActions.setAuthUser({ data: null }));
        }
      },
    })
   
}

public logout(): void {
  this.store.dispatch(AuthActions.setAuthUser({ data: null }))
  
}
}
