import type { Linea } from '../types'
import { asset } from '../lib/assets'
import SmartImage from './SmartImage'
import { ArrowRight } from './icons'

interface Props {
  linea: Linea
  count: number
  onSelect: (idLinea: string) => void
}

export default function LineaCard({ linea, count, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(linea.id_linea)}
      className="card card-hover focus-ring group flex h-full flex-col overflow-hidden p-5 text-left sm:p-6"
    >
      {/* Layout vertical: a 3 columnas la tarjeta ronda los 355 px, y con el
          tile al costado el texto se quedaba sin ancho. Arriba la imagen y el
          contador, abajo el texto a todo el ancho de la tarjeta. */}
      <div className="flex items-start justify-between gap-3">
        {/* Tile del rubro: aro dorado tenue que lo separa del fondo de la tarjeta */}
        <div className="relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-night-900 ring-1 ring-inset ring-white/10 transition-colors group-hover:ring-gold-400/40 sm:h-24 sm:w-24">
          <SmartImage
            src={asset(linea.imagen)}
            alt=""
            className="h-full w-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Contador como dato, no como frase: escanea más rápido en una grilla */}
        <span className="shrink-0 rounded-lg bg-white/8 px-2.5 py-1 font-display text-base font-semibold text-gold-300 ring-1 ring-inset ring-white/10">
          {count}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-gold-200">
        <span className="mr-1.5" aria-hidden>{linea.icono}</span>
        {linea.nombre}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {linea.descripcion}
      </p>

      {/* mt-auto: el CTA se pega abajo y queda alineado entre tarjetas de la
          misma fila, aunque el título ocupe una o dos líneas. */}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-slate-500 transition-colors duration-200 group-hover:text-gold-300">
        Ver {count === 1 ? 'el emprendimiento' : 'los emprendimientos'}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </button>
  )
}
