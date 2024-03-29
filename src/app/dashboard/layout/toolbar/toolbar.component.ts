import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Usuario } from '../../pages/usuarios/models/modelusuario';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthUsuario } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input()
  public drawer?: MatDrawer;

  public authUsuario$: Observable<Usuario | null>;

  constructor(private authService: AuthService, private store: Store) {
    this.authUsuario$ = this.store.select(selectAuthUsuario);
 }}
