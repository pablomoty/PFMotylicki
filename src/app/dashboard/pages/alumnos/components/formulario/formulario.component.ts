import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../models/modelalumno';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  editingUser?: Alumno;

  nombreControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2),]);
  apellidoControl = new FormControl<string | null>(null, [Validators.required,Validators.minLength(2),]);
  emailControl = new FormControl<string | null>(null, [Validators.required, Validators.email]);
  cursoControl = new FormControl<string | null>(null, [Validators.required]);
  generoControl = new FormControl<string | null>(null, [Validators.required]);

  alumnoForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    email: this.emailControl,
    curso: this.cursoControl,
    genero: this.generoControl
  });

  cursos: string[] = [
    'Desarrollo Web',
    'JavaScript',
    'React',
    'Angular',
    'C',
    'Java'
  ];

  constructor(
    private dialogRef: MatDialogRef<FormularioComponent>, @Inject(MAT_DIALOG_DATA) private data?: Alumno)
    
   {
   
    if (this.data) {
      
      this.editingUser = this.data;
      this.nombreControl.setValue(this.data.nombre);
      this.apellidoControl.setValue(this.data.apellido);
      this.emailControl.setValue(this.data.email);
      this.cursoControl.setValue(this.data.curso);
      this.generoControl.setValue(this.data.genero);
      
    }
  }

  guardarAlumno(): void {

    if (this.alumnoForm.invalid) {
      this.alumnoForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.alumnoForm.value);
    }
  }
}


