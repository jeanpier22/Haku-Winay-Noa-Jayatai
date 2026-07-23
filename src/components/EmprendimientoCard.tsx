import { Link } from 'react-router-dom'
import type { Emprendedor } from '../types'
import { fotoEmprendimiento } from '../lib/assets'
import { titleCase, getLinea } from '../lib/data'
import SmartImage from './SmartImage'
import { MapPinIcon, ArrowRight } from './icons'

export default function EmprendimientoCard({ e }: { e: Emprendedor }) {
  const linea = getLinea(e.id_linea)

  return (
    <Link
      to={`/emprendimiento/${e.id}`}
      className="card card-hover focus-ring group flex flex-col overflow-hidden"
    >
      {/* ── Foto ──────────────────────────────────────────────────────────────
          4:3 en vez de una altura fija corta: la fotografía es el argumento de
          venta, necesita superficie. El velo cubre solo el tercio inferior para
          asentar los chips sin apagar la imagen. */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={fotoEmprendimiento(e.nombre_emprendimiento, 'portada.webp')}
          alt={e.nombre_emprendimiento}
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-975/85 via-night-975/15 to-transparent" />

        {/* Categoría */}
        <span className="chip-overlay absolute left-3 top-3">
          {linea?.icono && <span aria-hidden>{linea.icono}</span>}
          {titleCase(e.linea_negocio)}
        </span>

        {/* Ubicación anclada a la foto: libera espacio de texto abajo */}
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-medium text-slate-200 drop-shadow">
          <MapPinIcon className="h-3.5 w-3.5 text-gold-400" />
          {titleCase(e.ubicacion.localidad)}, {titleCase(e.ubicacion.distrito)}
        </span>
      </div>

      {/* ── Contenido ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-white transition-colors group-hover:text-gold-200">
          {e.nombre_emprendimiento}
        </h3>
        <p className="mb-5 mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
          {e.descripcion}
        </p>

        {/* Pie separado por filete: cierra la tarjeta y da un punto de acción claro */}
        <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-4 text-sm font-semibold text-gold-300">
          Ver ficha completa
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
