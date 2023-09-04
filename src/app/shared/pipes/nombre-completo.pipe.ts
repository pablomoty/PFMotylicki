import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/dashboard/pages/usuarios/models/modelusuario';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(usuario: Usuario, ...args: unknown[]): unknown {

    const isUppercase = args[0] === 'uppercase';
    const fullName = `${usuario.nombre} ${usuario.apellido}`;
    return isUppercase ? fullName.toUpperCase() : fullName;
  }

}
