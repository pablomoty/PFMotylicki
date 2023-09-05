export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
}

export interface CreateAlumnoPayload {
  nombre: string | null;
  apellido: string | null;
  email: string | null;
}
