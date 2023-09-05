import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InscripcionActions } from '../../store/inscripcion.actions';
import { Alumno } from '../../../alumnos/models';
import { selectAlumnoOptions, selectCursoOptions } from '../../store/inscripcion.selectors';
import { Observable } from 'rxjs';
import { Curso } from '../../../cursos/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formularioinscripciones',
  templateUrl: './formularioinscripciones.component.html',
  styleUrls: ['./formularioinscripciones.component.scss']
})
export class FormularioinscripcionesComponent {
  cursoIdControl = new FormControl(null, Validators.required);
  alumnoIdControl = new FormControl(null, Validators.required);

  saleForm = new FormGroup({
    cursoId: this.cursoIdControl,
    alumnoId: this.alumnoIdControl,
  });

  alumnoOptions$: Observable<Alumno[]>;
  cursoOptions$: Observable<Curso[]>;

  constructor(private store: Store, private matDialogRef: MatDialogRef<FormularioinscripcionesComponent>) {
    this.alumnoOptions$ = this.store.select(selectAlumnoOptions);
    this.cursoOptions$ = this.store.select(selectCursoOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionActions.loadCursoOptions());
    this.store.dispatch(InscripcionActions.loadAlumnoOptions());
  }

  onSubmit(): void {
    if (this.saleForm.invalid) {
      this.saleForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscripcionActions.createInscripcion({ payload: this.saleForm.getRawValue() }));
      this.matDialogRef.close();
    }
  }
}
