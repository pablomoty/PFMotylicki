import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Curso } from './models';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos$ = new BehaviorSubject<Curso[]>([]);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  loadProducts(): void {
    // fetch ...
    /// .then((data) => this.cursos$.next(data))
    this.cursos$.next([
      {
        id: 1,
        nombre: 'Desarrollo Web',
        precio: 15000,        
      },
      {
        id: 2,
        nombre: 'JavaScript',
        precio: 25000,
      },
      {
        id: 3,
        nombre: 'Angular',
        precio: 20000,      
      },
      {
        id: 4,
        nombre: 'React',
        precio: 20000,      
      },
      {
        id: 5,
        nombre: 'Java',
        precio: 35000,      
      },
    ]);
  }

  crear(): void {
    this.cursos$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.cursos$.next([
          ...arrayActual,
          {
            id: arrayActual.length + 1,
            nombre: 'Nuevo Curso',
            
            precio: 10000,
            
          },
        ]);
      },
    });
  }

  deleteById(id: number): void {
    this.cursos$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.cursos$.next(
          arrayActual.filter((p) => p.id !== id),
        );
      }
    })
  }

  
}
