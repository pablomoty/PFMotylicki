export interface Usuario {
    id: number;
    nombre: string
    apellido: string
    email: string
    password: string
    rol: string
    genero: string
    
  
  }

  export interface CrearUsuarioData {
    id: number;
    nombre: string
    apellido: string
    email: string
    password: string
    rol: string
    genero: string
  
  }

  export interface UpdateUsuarioData {
    id: number;
    nombre: string
    apellido: string
    email: string
    password: string
    rol: string
    genero: string
  
  }