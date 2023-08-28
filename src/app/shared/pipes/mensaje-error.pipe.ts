import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mensajeError'
})
export class MensajeErrorPipe implements PipeTransform {

  transform(error: { key: string, value: any }, ...args: unknown[]): unknown {
    
    const mensajeError: Record<string, string> = {
      required: 'Este campo es requerido',
      email: 'Ingrese un email valido',
      minlength: 'El largo no cumple con el requerido'
    };

    return mensajeError[error.key] || 'Campo invalido';
  }

}
