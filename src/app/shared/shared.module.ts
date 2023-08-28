import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepetirDirective } from './directivas/repetir.directive';
import { ResaltadoDirective } from './directivas/resaltado.directive';
import { MensajeErrorPipe } from './pipes/mensaje-error.pipe';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';
import { MatButtonModule } from '@angular/material/button'; // BOTONES
import { MatIconModule } from '@angular/material/icon'; // ICONOS
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog'
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [
    RepetirDirective,
    ResaltadoDirective,
    MensajeErrorPipe,
    NombreCompletoPipe,
    

  ],
  imports: [
    CommonModule,
    
    
  ], exports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    NombreCompletoPipe,
    MensajeErrorPipe
  ]
})
export class SharedModule { }
