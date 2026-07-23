import emprendedoresJson from '../data/emprendedores.json'
import lineasJson from '../data/lineas.json'
import productosJson from '../data/productos_temporada.json'
import type { Emprendedor, Linea, ProductoTemporada } from '../types'

export const emprendedores = emprendedoresJson as Emprendedor[]
export const lineas = lineasJson as Linea[]
export const productosTemporada = productosJson as ProductoTemporada[]

export const MESES_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

/** Iniciales para la franja de disponibilidad (12 columnas, poco espacio). */
export const MESES_INICIAL = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

export function mesActualNombre(): string {
  return MESES_ES[new Date().getMonth()]
}

/** Mes actual en formato 1–12 (el mismo que usa el campo `meses` del JSON). */
export function mesActualNumero(): number {
  return new Date().getMonth() + 1
}

/** Convierte [3,4,5,11,12] en "marzo–mayo · noviembre–diciembre" para leer de un vistazo. */
export function rangosDeMeses(meses: number[]): string {
  const orden = [...new Set(meses)].filter((m) => m >= 1 && m <= 12).sort((a, b) => a - b)
  if (orden.length === 0) return ''
  if (orden.length === 12) return 'todo el año'

  const tramos: number[][] = []
  for (const m of orden) {
    const ultimo = tramos[tramos.length - 1]
    if (ultimo && m === ultimo[ultimo.length - 1] + 1) ultimo.push(m)
    else tramos.push([m])
  }

  return tramos
    .map((t) =>
      t.length === 1
        ? MESES_ES[t[0] - 1]
        : `${MESES_ES[t[0] - 1]}–${MESES_ES[t[t.length - 1] - 1]}`,
    )
    .join(' · ')
}

/** Busca un emprendimiento por su id (no depende de la posición en el array). */
export function getEmprendedor(id: number | string): Emprendedor | undefined {
  const n = typeof id === 'string' ? Number(id) : id
  return emprendedores.find((e) => e.id === n)
}

export function getLinea(idLinea: string): Linea | undefined {
  return lineas.find((l) => l.id_linea === idLinea)
}

export function emprendedoresPorLinea(idLinea: string): Emprendedor[] {
  return emprendedores.filter((e) => e.id_linea === idLinea)
}

export function contarPorLinea(idLinea: string): number {
  return emprendedoresPorLinea(idLinea).length
}

/** Ficha de temporada de un emprendimiento (comparten el mismo `id`). */
export function temporadaDeEmprendedor(id: number): ProductoTemporada | undefined {
  return productosTemporada.find((p) => p.id === id)
}

/** Productos disponibles en el mes actual (1–12). */
export function productosDisponibles(mes = new Date().getMonth() + 1): ProductoTemporada[] {
  return productosTemporada.filter((p) => p.meses.includes(mes))
}

/** Formatea un texto en MAYÚSCULAS a Capitalización por palabra legible. */
export function titleCase(texto: string): string {
  return texto
    .toLowerCase()
    .replace(/\b\w[\wáéíóúñ]*/gi, (w) => (w.length > 2 ? w[0].toUpperCase() + w.slice(1) : w))
}
