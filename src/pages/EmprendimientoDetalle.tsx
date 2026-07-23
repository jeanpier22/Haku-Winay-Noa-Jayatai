import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getEmprendedor, getLinea, titleCase, temporadaDeEmprendedor,
  rangosDeMeses, mesActualNumero,
} from '../lib/data'
import { fotoEmprendimiento } from '../lib/assets'
import { useGaleria } from '../lib/useGaleria'
import SmartImage from '../components/SmartImage'
import Lightbox from '../components/Lightbox'
import DisponibilidadMeses from '../components/DisponibilidadMeses'
import {
  ArrowRight, PhoneIcon, MailIcon, MapPinIcon, UsersIcon, LeafIcon, SparkIcon,
} from '../components/icons'

export default function EmprendimientoDetalle() {
  const { id } = useParams()
  const e = getEmprendedor(id ?? '')
  const { urls: galeria, cargando: galeriaCargando } = useGaleria(e?.nombre_emprendimiento)
  const [zoom, setZoom] = useState<string | null>(null)

  if (!e) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl font-semibold">Emprendimiento no encontrado</h1>
        <p className="mt-3 text-slate-400">El emprendimiento que buscas no existe.</p>
        <Link to="/emprendimientos" className="btn-primary mt-6">
          Volver al directorio <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  const linea = getLinea(e.id_linea)
  const nombre = e.nombre_emprendimiento
  const telHref = `tel:${e.celular.split(/[\s-]/)[0]}`
  const temporada = temporadaDeEmprendedor(e.id)
  const disponibleAhora = temporada?.meses.includes(mesActualNumero()) ?? false

  const integrantes = [
    { rol: 'Presidente', nombre: e.integrantes.presidente },
    { rol: 'Secretario', nombre: e.integrantes.secretario },
    { rol: 'Tesorero', nombre: e.integrantes.tesorero },
  ]

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <SmartImage
          src={fotoEmprendimiento(nombre, 'portada.webp')}
          alt={nombre}
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 55%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-975/65 to-night-975/25" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-8">
          <nav className="mb-4 text-xs text-slate-400">
            <Link to="/" className="transition-colors hover:text-gold-300">Inicio</Link>
            <span className="mx-1.5 text-slate-600">/</span>
            <Link to="/emprendimientos" className="transition-colors hover:text-gold-300">
              Emprendimientos
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-2">
            {linea && (
              <span className="chip-gold">
                <span aria-hidden>{linea.icono}</span> {linea.nombre}
              </span>
            )}
            {disponibleAhora && (
              <span className="chip-field">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-field-300" />
                Disponible este mes
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">{nombre}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-300">
            <MapPinIcon className="h-4 w-4 text-gold-400" />
            {titleCase(e.ubicacion.localidad)}, {titleCase(e.ubicacion.distrito)} — {titleCase(e.ubicacion.provincia)}, {titleCase(e.ubicacion.departamento)}
          </p>
        </div>
      </section>

      <div className="container-page grid gap-8 py-12 lg:grid-cols-3">
        {/* ===== COLUMNA PRINCIPAL ===== */}
        <div className="space-y-10 lg:col-span-2">
          {/* Sobre el emprendimiento */}
          <section>
            <span className="eyebrow">Sobre el emprendimiento</span>
            <h2 className="mt-2 text-2xl font-semibold">{titleCase(e.rubro)}</h2>
            <p className="mt-4 leading-relaxed text-slate-300">{e.descripcion}</p>
          </section>

          {/* Misión / Visión — el filete superior de color las distingue de un vistazo */}
          <section className="grid gap-5 sm:grid-cols-2">
            <article className="card overflow-hidden p-6">
              <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-gold-sheen" />
              <div className="flex items-center gap-2 text-gold-300">
                <LeafIcon className="h-5 w-5" />
                <h3 className="font-display text-lg font-semibold">Misión</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{e.mision}</p>
            </article>
            <article className="card overflow-hidden p-6">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-field-400 to-field-600"
              />
              <div className="flex items-center gap-2 text-field-400">
                <ArrowRight className="h-5 w-5" />
                <h3 className="font-display text-lg font-semibold">Visión</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{e.vision}</p>
            </article>
          </section>

          {/* Galería */}
          <section>
            <div className="flex items-baseline gap-3">
              <h3 className="font-display text-xl font-semibold">Galería</h3>
              {galeria.length > 0 && (
                <span className="text-xs font-medium text-slate-500">
                  {galeria.length} {galeria.length === 1 ? 'foto' : 'fotos'}
                </span>
              )}
            </div>

            {galeria.length === 0 ? (
              galeriaCargando ? (
                // Esqueletos en vez de un texto suelto: evita el salto de layout
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="aspect-[4/3] animate-pulse rounded-xl bg-night-850" />
                  ))}
                </div>
              ) : (
                <p className="mt-4 rounded-xl border border-white/8 bg-white/4 p-6 text-center text-sm text-slate-400">
                  Este emprendimiento aún no tiene fotos de galería.
                </p>
              )
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {galeria.map((url, i) => (
                  <button
                    key={url}
                    onClick={() => setZoom(url)}
                    aria-label={`Ampliar foto ${i + 1} de ${nombre}`}
                    className="focus-ring group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-inset ring-white/10"
                  >
                    <SmartImage
                      src={url}
                      alt={`${nombre} — foto ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-night-975/0 transition-colors duration-300 group-hover:bg-night-975/25" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Ubicación / Mapa */}
          <section>
            <h3 className="font-display text-xl font-semibold">Ubicación</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
              <MapPinIcon className="h-4 w-4 text-gold-400" />
              {titleCase(e.ubicacion.localidad)} — {titleCase(e.ubicacion.distrito)} — {titleCase(e.ubicacion.provincia)}
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/8">
              <iframe
                title={`Mapa de ${nombre}`}
                src={e.maps}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </div>

        {/* ===== BARRA LATERAL ===== */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* Contacto */}
          <div className="card overflow-hidden">
            <div className="bg-gold-sheen p-5 text-night-975">
              <h3 className="font-display text-lg font-bold">Contacto directo</h3>
              <p className="text-sm text-night-900/75">Comunícate con la familia productora</p>
            </div>
            <div className="space-y-1 p-3">
              <a
                href={telHref}
                className="focus-ring flex items-center gap-3 rounded-xl p-2 text-sm text-slate-300 transition-colors hover:bg-white/6 hover:text-gold-200"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/6 ring-1 ring-inset ring-white/10">
                  <PhoneIcon className="h-4 w-4 text-gold-400" />
                </span>
                {e.celular}
              </a>
              <a
                href={`mailto:${e.correo}`}
                className="focus-ring flex items-center gap-3 break-all rounded-xl p-2 text-sm text-slate-300 transition-colors hover:bg-white/6 hover:text-gold-200"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/6 ring-1 ring-inset ring-white/10">
                  <MailIcon className="h-4 w-4 text-gold-400" />
                </span>
                {e.correo}
              </a>
              <div className="flex items-center gap-3 p-2 text-sm text-slate-300">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/6 ring-1 ring-inset ring-white/10">
                  <MapPinIcon className="h-4 w-4 text-gold-400" />
                </span>
                La Unión — Arequipa
              </div>
            </div>
          </div>

          {/* Temporada: responde "¿cuándo puedo comprar?" sin salir de la ficha */}
          {temporada && (
            <div className="card p-5">
              <div className="flex items-center gap-2">
                <SparkIcon className="h-5 w-5 text-field-400" />
                <h3 className="font-display text-lg font-semibold">Temporada</h3>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {temporada.productos}
              </p>

              <p className="mt-3 text-xs capitalize text-slate-400">
                Disponible en <span className="text-field-300">{rangosDeMeses(temporada.meses)}</span>
              </p>

              <div className="mt-4">
                <DisponibilidadMeses meses={temporada.meses} />
              </div>
            </div>
          )}

          {/* Integrantes */}
          <div className="card p-5">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-gold-400" />
              <h3 className="font-display text-lg font-semibold">Integrantes</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {integrantes.map((m) => (
                <li key={m.rol} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-400/15 text-xs font-bold text-gold-300">
                    {m.nombre.split(' ').slice(0, 2).map((w) => w[0]).join('')}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{titleCase(m.nombre)}</p>
                    <p className="text-xs text-slate-500">{m.rol}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/emprendimientos" className="btn-ghost w-full">
            ← Volver al directorio
          </Link>
        </aside>
      </div>

      <Lightbox src={zoom} alt={nombre} onClose={() => setZoom(null)} />
    </>
  )
}
