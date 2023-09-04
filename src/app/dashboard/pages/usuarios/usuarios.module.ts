import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    UsuariosComponent,
    FormularioComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,

    
  ],exports: [
    UsuariosComponent
  ]
})
export class UsuariosModule { }
