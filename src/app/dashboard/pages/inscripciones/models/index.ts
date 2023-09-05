import { Alumno } from '../../alumnos/models';
import { Curso } from '../../cursos/models';

export interface Inscripcion {
  id: number;
  cursoId: number;
  alumnoId: number;
}

export interface InscripcionCursoMasAlumno extends Inscripcion {
  curso: Curso;
  alumno: Alumno;
}

export interface CreateInscripcionPayload {
  cursoId: number | null;
  alumnoId: number | null;
}
