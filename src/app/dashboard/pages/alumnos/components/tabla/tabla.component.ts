import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Alumno } from '../../models/modelalumno';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent {
  displayedColumns: string[] = ['id', 'nombrecompleto','email', 'curso', 'genero', 'acciones'];

  @Input()
  dataSource: Alumno[] = [];

  @Output()
  borrarAlumnos = new EventEmitter<Alumno>();

  @Output()
  editarAlumnos = new EventEmitter<Alumno>();
}
