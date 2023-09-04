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

  public usuarios: Observable<Usuario[]>;
  public destroyed = new Subject<boolean>();

  public loading = false;
  constructor(private matDialog: MatDialog, private usuarioService: UsuariosService) {
    this.usuarioService.loadUsuarios();
    this.usuarios = this.usuarioService.getUsuarios();
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  abrirFormulario(): void {
    this.matDialog.open(FormularioComponent).afterClosed().subscribe({
      
        next: (v) => {
          if (v) {
            this.usuarioService.createUsuario({
              
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

  borrarUsuario(usuarioToDelete: Usuario): void {

    if (confirm(`¿Está seguro de eliminar a ${usuarioToDelete.nombre}?`)) {

      this.usuarioService.deleteUsuarioById(usuarioToDelete.id);
    }
  }

  editarUsuario(usuarioToEdit: Usuario): void {

    this.matDialog.open(FormularioComponent, { data: usuarioToEdit }).afterClosed().subscribe({
      next: (usuarioUpdated) => {

        if (usuarioUpdated) {
          this.usuarioService.updateUsuarioById(usuarioToEdit.id, usuarioUpdated);
        }
      },
    });

        
      
      
      
      
      
  }
}



