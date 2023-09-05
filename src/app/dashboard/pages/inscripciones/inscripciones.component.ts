import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscripcionActions } from './store/inscripcion.actions';
import { InscripcionCursoMasAlumno } from './models';
import { selectInscripcions } from './store/inscripcion.selectors';
import { MatDialog } from '@angular/material/dialog';
import { FormularioinscripcionesComponent } from './formularioinscripciones/formularioinscripciones/formularioinscripciones.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  displayedColumns = ['id', 'curso', 'alumno', 'total'];
  inscripciones$: Observable<InscripcionCursoMasAlumno[]>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.inscripciones$ = this.store.select(selectInscripcions)
  }

  onAdd(): void {
    this.matDialog.open(FormularioinscripcionesComponent);
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionActions.loadInscripciones())
  }
}
