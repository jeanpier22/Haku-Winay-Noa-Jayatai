import { Link } from 'react-router-dom'
import type { ProductoTemporada } from '../types'
import { getEmprendedor, rangosDeMeses } from '../lib/data'
import { fotoEmprendimiento } from '../lib/assets'
import SmartImage from './SmartImage'
import DisponibilidadMeses from './DisponibilidadMeses'
import { ArrowRight, MapPinIcon } from './icons'

/** "Carne de chancho y lechoncitos" → ["Carne de chancho", "lechoncitos"] */
function separarProductos(texto: string): string[] {
  return texto
    .split(/,| y (?=[^,]*$)/i)
    .map((t) => t.trim())
    .filter(Boolean)
}

export default function ProductoCard({ p }: { p: ProductoTemporada }) {
  // Se resuelve la imagen y el enlace a partir del emprendimiento real (por id),
  // no del nombre del producto — así evitamos rutas rotas por diferencias de nombre.
  const emp = getEmprendedor(p.id)
  const img = emp ? fotoEmprendimiento(emp.nombre_emprendimiento, 'vision.webp') : ''
  const items = separarProductos(p.productos)

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={img}
          alt={p.nombre}
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-975/85 via-night-975/10 to-transparent" />

        {/* Estado en verde: color reservado para "frescura / disponible ahora" */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-field-700/90 px-2.5 py-1 text-[11px] font-semibold text-field-300 ring-1 ring-field-400/40 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-field-300" />
          Disponible ahora
        </span>

        <span className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 drop-shadow">
          {p.linea}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-white">
          {p.nombre}
        </h3>

        {emp && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
            <MapPinIcon className="h-3.5 w-3.5 text-clay-400" />
            {emp.ubicacion.localidad}, {emp.ubicacion.distrito}
          </p>
        )}

        {/* Los productos como fichas legibles en vez de una cadena separada por comas */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {items.map((item) => (
            <li key={item} className="chip-clay !font-medium">
              {item}
            </li>
          ))}
        </ul>

        {/* Calendario de temporada: el aporte real de información de esta tarjeta */}
        <div className="mb-5 mt-5">
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Temporada
            </span>
            <span className="text-right text-[11px] font-medium capitalize text-slate-400">
              {rangosDeMeses(p.meses)}
            </span>
          </div>
          <DisponibilidadMeses meses={p.meses} />
        </div>

        {emp && (
          <Link
            to={`/emprendimiento/${emp.id}`}
            className="focus-ring mt-auto flex items-center justify-between border-t border-white/8 pt-4 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
          >
            Contactar productor
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
  )
}
