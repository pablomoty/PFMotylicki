import { Injectable } from '@angular/core';
import { CrearUsuarioData, UpdateUsuarioData, Usuario } from './models/modelusuario';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _usuarios$ = new BehaviorSubject<Usuario[]>([]);
  private usuarios$ = this._usuarios$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  loadUsuarios(): void {
   
    this.httpClient.get<Usuario[]>('http://localhost:3000/usuarios', {}).subscribe({

      next: (response) => {

        this._usuarios$.next(response);
      },
      error: () => {
        this.notifier.showError('Error');
      },
      
    })
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.usuarios$;
  }

  getUsuarioById(id: number) {
    return this.usuarios$.pipe(
      take(1),
      map(( usuarios ) =>  usuarios.find((u) => u.id === id)),
    )
  }

  createUsuario(usuario: CrearUsuarioData): void {


    this.httpClient.post<Usuario>('http://localhost:3000/usuarios', usuario)
      .pipe(
        mergeMap((usuarioCreate) => this.usuarios$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, usuarioCreate])
          )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._usuarios$.next(arrayActualizado);
        }
      })
 
  }

  updateUsuarioById(id: number, usuarioActualizado: UpdateUsuarioData): void {

    this.httpClient.put('http://localhost:3000/usuarios/' + id, usuarioActualizado).subscribe({

      next: () => this.loadUsuarios(),
    })
  }


  deleteUsuarioById(id: number): void {
    this.httpClient.delete('http://localhost:3000/usuarios/' + id) .pipe().subscribe({
         
          next: () => this.loadUsuarios(),
    })
}

  
}
