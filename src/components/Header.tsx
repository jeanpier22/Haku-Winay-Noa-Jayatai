import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { asset } from '../lib/assets'
import { MenuIcon, CloseIcon } from './icons'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/emprendimientos', label: 'Emprendimientos', end: false },
  { to: '/nosotros', label: 'Nosotros', end: false },
  { to: '/contacto', label: 'Contáctanos', end: false },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'focus-ring rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200',
      isActive
        ? 'bg-gold-400/15 text-gold-200 ring-1 ring-inset ring-gold-400/35'
        : 'text-slate-400 hover:bg-white/6 hover:text-white',
    ].join(' ')

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-night-950/85 shadow-[0_1px_0_0_rgba(255,255,255,.04)] backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={asset('images/logo/logo.jpeg')}
            alt="Logo Haku Wiñay Noa Jayatai"
            className="h-9 w-9 rounded-lg object-cover ring-1 ring-white/10"
          />
          <div className="leading-tight">
            <span className="block font-display text-base font-semibold text-white">
              Haku Wiñay <span className="text-gold-400">·</span> Noa Jayatai
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-slate-400 sm:block">
              La Unión · Arequipa
            </span>
          </div>
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Botón menú móvil */}
        <button
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Navegación móvil */}
      {open && (
        <nav className="container-page grid gap-1 pb-4 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
