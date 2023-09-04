import { Injectable } from "@angular/core";
import { LogueoUsuario } from "./models";
import { Observable, map } from "rxjs";
import { Usuario } from "../dashboard/pages/usuarios/models/modelusuario";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth/auth.actions";
import { selectAuthUsuario } from "../store/auth/auth.selector";

@Injectable({ providedIn: 'root' })
export class AuthService {
  public authUsuario$ = this.store.select(selectAuthUsuario);

  constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient, private store:Store) {}


  autenticacion(): Observable<boolean> {
    return this.httpClient.get<Usuario[]>(environment.baseApiUrl + '/usuarios', {
      }).pipe(
      map((usuariosResult) => {
      
        return !!usuariosResult.length
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
          const authUsuario = response[0];
          this.store.dispatch(AuthActions.setAuthUsuario({ data: authUsuario }));
          this.router.navigate(['/dashboard']);
        } else {
          
          this.notifier.showError('email o contrasena invalida');
          this.store.dispatch(AuthActions.setAuthUsuario({ data: null }));
        }
      },
    })
   
}

public logout(): void {
  this.store.dispatch(AuthActions.setAuthUsuario({ data: null }))
  
}
}
