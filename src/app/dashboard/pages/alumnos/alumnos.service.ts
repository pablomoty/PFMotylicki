import { Injectable } from '@angular/core';
import { CrearAlumnoData, UpdateAlumnoData, Alumno } from './models/modelalumno';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private _users$ = new BehaviorSubject<Alumno[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) {}

  loadUsers(): void {
   
    this.httpClient.get<Alumno[]>('http://localhost:3000/alumnos', {}).subscribe({

      next: (response) => {

        this._users$.next(response);
      },
      error: () => {
        this.notifier.showError('Error');
      },
      
    })
  }

  getUsers(): Observable<Alumno[]> {
    return this.users$;
  }

  getUserById(id: number) {
    return this.users$.pipe(
      take(1),
      map(( users ) =>  users.find((u) => u.id === id)),
    )
  }

  createUser(alumno: CrearAlumnoData): void {


    this.httpClient.post<Alumno>('http://localhost:3000/alumnos', alumno)
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

  updateUserById(id: number, alumnoActualizado: UpdateAlumnoData): void {

    this.httpClient.put('http://localhost:3000/alumnos/' + id, alumnoActualizado).subscribe({

      next: () => this.loadUsers(),
    })
  }


  deleteUserById(id: number): void {
    this.httpClient.delete('http://localhost:3000/alumnos/' + id) .pipe().subscribe({
         
          next: () => this.loadUsers(),
    })
}

  
}
