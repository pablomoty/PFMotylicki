import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/modelusuario';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent {
  displayedColumns: string[] = ['id', 'nombrecompleto','email', 'rol', 'genero', 'acciones'];

  @Input()
  dataSource: Usuario[] = [];

  @Output()
  borrarUsuarios = new EventEmitter<Usuario>();

  @Output()
  editarUsuarios = new EventEmitter<Usuario>();
}
