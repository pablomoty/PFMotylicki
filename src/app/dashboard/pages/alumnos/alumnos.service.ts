import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Alumno, CreateAlumnoPayload } from './models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private _alumnos$ = new BehaviorSubject<Alumno[]>([]);
  private readonly baseUrl = environment.baseApiUrl + '/alumnos';
  public alumnos$ = this._alumnos$.asObservable();

  constructor(private httpClient: HttpClient) {}

  loadAlumnos(): void {
    this.httpClient.get<Alumno[]>(this.baseUrl).subscribe({
      next: (alumnos) => {
        this._alumnos$.next(alumnos); 
      },
      error: () => {
       
      },
    });
  }

  createAlumno(payload: CreateAlumnoPayload, afterCreate?: () => void): void {
    this.httpClient.post<Alumno>(this.baseUrl, payload).subscribe({
      next: () => {
        this.loadAlumnos(); 
        if (afterCreate) afterCreate();
      },
      error: () => {
        
      },
    });
  }

  deleteAlumnoById(id: number): void {
    this.httpClient.delete(this.baseUrl + '/' + id).subscribe({
      next: () => {
        this.loadAlumnos(); 
      },
      error: () => {
        
      },
    });
  }

  clearAlumnos(): void {
    this._alumnos$.next([]);
  }
  
}
