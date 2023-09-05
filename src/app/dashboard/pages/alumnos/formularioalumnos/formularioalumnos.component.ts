import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-formularioalumnos',
  templateUrl: './formularioalumnos.component.html',
  styleUrls: ['./formularioalumnos.component.scss']
})
export class FormularioalumnosComponent {
  editingAlumno?: Alumno;
  nombreControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
  ]);

  apellidoControl = new FormControl<string | null>(null, [Validators.required]);
  emailControl = new FormControl<string | null>(null, [Validators.required]);

  alumnoForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    email: this.emailControl,
  });

  // userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormularioalumnosComponent>,
    private alumnoService: AlumnosService,
    @Inject(MAT_DIALOG_DATA) private data?: Alumno
  ) {
    if (this.data) {
      this.editingAlumno = this.data;
      this.nombreControl.setValue(this.data.nombre);
      this.apellidoControl.setValue(this.data.apellido);
      this.emailControl.setValue(this.data.email);
    }
  }

  onSubmit(): void {
    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      this.alumnoService.createAlumno(this.alumnoForm.getRawValue(), () => {
        this.dialogRef.close(this.alumnoForm.value);
      });
    }
  }
}
