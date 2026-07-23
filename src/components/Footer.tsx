import { Link } from 'react-router-dom'
import { asset } from '../lib/assets'
import { MapPinIcon, LeafIcon } from './icons'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/8 bg-night-950/60">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={asset('images/logo/logo.webp')}
              alt="Logo Haku Wiñay Noa Jayatai"
              className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/10"
            />
            <span className="font-display text-lg font-semibold text-white">
              Haku Wiñay · Noa Jayatai
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Impulsando emprendimientos rurales y productos de calidad de las familias
            productoras de La Unión, Arequipa.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
            Navegación
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li><Link to="/" className="transition hover:text-gold-300">Inicio</Link></li>
            <li><Link to="/emprendimientos" className="transition hover:text-gold-300">Emprendimientos</Link></li>
            <li><Link to="/nosotros" className="transition hover:text-gold-300">Nosotros</Link></li>
            <li><Link to="/contacto" className="transition hover:text-gold-300">Contáctanos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-300">
            Ubicación
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              Provincia de La Unión, Arequipa — Perú
            </li>
            <li className="flex items-start gap-2">
              <LeafIcon className="mt-0.5 h-4 w-4 shrink-0 text-field-400" />
              Programa Haku Wiñay / Noa Jayatai — FONCODES
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Haku Wiñay · Noa Jayatai. Todos los derechos reservados.</p>
          <p>Vitrina de emprendimientos rurales</p>
        </div>
      </div>
    </footer>
  )
}
