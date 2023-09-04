export interface Alumno {
    id: number;
    nombre: string
    apellido: string
    email: string
    curso: string
    genero: string
    rol: "ADMIN" | "USUARIO"
  
  }

  export interface CrearAlumnoData {
    id: number;
    nombre: string
    apellido: string
    email: string
    curso: string
    genero: string
  
  }

  export interface UpdateAlumnoData {
    id: number;
    nombre: string
    apellido: string
    email: string
    curso: string
    genero: string
  
  }