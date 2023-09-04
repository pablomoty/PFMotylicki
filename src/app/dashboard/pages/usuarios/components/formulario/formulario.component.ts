import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../models/modelusuario';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  editingUser?: Usuario;

  nombreControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2),]);
  apellidoControl = new FormControl<string | null>(null, [Validators.required,Validators.minLength(2),]);
  emailControl = new FormControl<string | null>(null, [Validators.required, Validators.email]);
  passwordControl = new FormControl<string | null>(null, [Validators.required]);
  rolControl = new FormControl<string | null>(null, [Validators.required]);
  generoControl = new FormControl<string | null>(null, [Validators.required]);

  usuarioForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    email: this.emailControl,
    password: this.passwordControl,
    rol: this.rolControl,
    genero: this.generoControl
  });

    
  constructor(
    private dialogRef: MatDialogRef<FormularioComponent>, @Inject(MAT_DIALOG_DATA) private data?: Usuario)
    
   {
   
    if (this.data) {
      
      this.editingUser = this.data;
      this.nombreControl.setValue(this.data.nombre);
      this.apellidoControl.setValue(this.data.apellido);
      this.emailControl.setValue(this.data.email);
      this.passwordControl.setValue(this.data.password);
      this.rolControl.setValue(this.data.rol);
      this.generoControl.setValue(this.data.genero);
      
    }
  }

  guardarUsuario(): void {

    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.usuarioForm.value);
    }
  }
}


