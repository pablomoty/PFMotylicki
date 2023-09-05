import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlumnosService } from './alumnos.service';
import { Observable } from 'rxjs';
import { Alumno } from './models';
import { MatDialog } from '@angular/material/dialog';
import { FormularioalumnosComponent } from './formularioalumnos/formularioalumnos.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit, OnDestroy {
  alumnos$: Observable<Alumno[]>;
  displayedColumns = ['id', 'name', 'apellido', 'email', 'actions'];

  constructor(private alumnosService: AlumnosService, private dialog: MatDialog) {
    this.alumnos$ = this.alumnosService.alumnos$;
  }
  ngOnDestroy(): void {
    this.alumnosService.clearAlumnos();
  }

  ngOnInit(): void {
    this.alumnosService.loadAlumnos();
  }

  onCreate(): void {
    this.dialog.open(FormularioalumnosComponent);
  }
  onDelete(id: number): void {
    this.alumnosService.deleteAlumnoById(id);
  }
}
