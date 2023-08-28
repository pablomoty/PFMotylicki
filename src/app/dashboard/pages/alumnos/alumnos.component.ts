import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './components/formulario/formulario.component';
import { Alumno } from './models/modelalumno';
import { AlumnosService } from './alumnos.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnDestroy {

  public users: Observable<Alumno[]>;
  public destroyed = new Subject<boolean>();

  public loading = false;
  constructor(private matDialog: MatDialog, private alumnoService: AlumnosService) {
    this.alumnoService.loadUsers();
    this.users = this.alumnoService.getUsers();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  abrirFormulario(): void {
    this.matDialog.open(FormularioComponent).afterClosed().subscribe({
      
        next: (v) => {
          if (v) {
            this.alumnoService.createUser({
              
              nombre: v.nombre,
              apellido: v.apellido,
              email: v.email,
              curso: v.curso,
              genero: v.genero,
              id: 0
            });
          }
        },
      });
  }

  borrarAlumno(userToDelete: Alumno): void {

    if (confirm(`¿Está seguro de eliminar a ${userToDelete.nombre}?`)) {

      this.alumnoService.deleteUserById(userToDelete.id);
    }
  }

  editarAlumno(userToEdit: Alumno): void {

    this.matDialog.open(FormularioComponent, { data: userToEdit }).afterClosed().subscribe({
      next: (userUpdated) => {

        if (userUpdated) {
          this.alumnoService.updateUserById(userToEdit.id, userUpdated);
        }
      },
    });

        
      
      
      
      
      
  }
}



