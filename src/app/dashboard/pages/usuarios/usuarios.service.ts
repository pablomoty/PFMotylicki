import { Injectable } from '@angular/core';
import { CrearUsuarioData, UpdateUsuarioData, Usuario } from './models/modelusuario';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _users$ = new BehaviorSubject<Usuario[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  loadUsers(): void {
   
    this.httpClient.get<Usuario[]>('http://localhost:3000/usuarios', {}).subscribe({

      next: (response) => {

        this._users$.next(response);
      },
      error: () => {
        this.notifier.showError('Error');
      },
      
    })
  }

  getUsers(): Observable<Usuario[]> {
    return this.users$;
  }

  getUserById(id: number) {
    return this.users$.pipe(
      take(1),
      map(( users ) =>  users.find((u) => u.id === id)),
    )
  }

  createUser(usuario: CrearUsuarioData): void {


    this.httpClient.post<Usuario>('http://localhost:3000/usuarios', usuario)
      .pipe(
        mergeMap((userCreate) => this.users$.pipe(
          take(1),
          map(
            (arrayActual) => [...arrayActual, userCreate])
          )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._users$.next(arrayActualizado);
        }
      })
 
  }

  updateUserById(id: number, usuarioActualizado: UpdateUsuarioData): void {

    this.httpClient.put('http://localhost:3000/usuarios/' + id, usuarioActualizado).subscribe({

      next: () => this.loadUsers(),
    })
  }


  deleteUserById(id: number): void {
    this.httpClient.delete('http://localhost:3000/usuarios/' + id) .pipe().subscribe({
         
          next: () => this.loadUsers(),
    })
}

  
}
