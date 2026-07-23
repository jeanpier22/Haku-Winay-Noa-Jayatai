export interface Ubicacion {
  departamento: string
  provincia: string
  distrito: string
  localidad: string
}

export interface Integrantes {
  presidente: string
  secretario: string
  tesorero: string
}

export interface Emprendedor {
  id: number
  id_linea: string
  linea_negocio: string
  nombre_emprendimiento: string
  rubro: string
  descripcion: string
  mision: string
  vision: string
  celular: string
  correo: string
  ubicacion: Ubicacion
  maps: string
  integrantes: Integrantes
}

export interface Linea {
  id: number
  id_linea: string
  nombre: string
  icono: string
  imagen: string
  descripcion: string
}

export interface ProductoTemporada {
  id: number
  linea: string
  nombre: string
  rubro: string
  productos: string
  meses: number[]
}
