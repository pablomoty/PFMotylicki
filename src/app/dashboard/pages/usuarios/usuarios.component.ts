import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './components/formulario/formulario.component';
import { Usuario } from './models/modelusuario';
import { UsuariosService } from './usuarios.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnDestroy {

  public users: Observable<Usuario[]>;
  public destroyed = new Subject<boolean>();

  public loading = false;
  constructor(private matDialog: MatDialog, private usuarioService: UsuariosService) {
    this.usuarioService.loadUsers();
    this.users = this.usuarioService.getUsers();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  abrirFormulario(): void {
    this.matDialog.open(FormularioComponent).afterClosed().subscribe({
      
        next: (v) => {
          if (v) {
            this.usuarioService.createUser({
              
              nombre: v.nombre,
              apellido: v.apellido,
              email: v.email,
              password: v.password,
              rol: v.roles,
              genero: v.genero,
              id: 0
            });
          }
        },
      });
  }

  borrarUsuario(userToDelete: Usuario): void {

    if (confirm(`¿Está seguro de eliminar a ${userToDelete.nombre}?`)) {

      this.usuarioService.deleteUserById(userToDelete.id);
    }
  }

  editarUsuario(userToEdit: Usuario): void {

    this.matDialog.open(FormularioComponent, { data: userToEdit }).afterClosed().subscribe({
      next: (userUpdated) => {

        if (userUpdated) {
          this.usuarioService.updateUserById(userToEdit.id, userUpdated);
        }
      },
    });

        
      
      
      
      
      
  }
}



