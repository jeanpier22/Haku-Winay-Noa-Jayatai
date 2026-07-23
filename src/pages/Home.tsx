import { Link, useNavigate } from 'react-router-dom'
import { asset } from '../lib/assets'
import {
  emprendedores,
  lineas,
  productosDisponibles,
  mesActualNombre,
  contarPorLinea,
} from '../lib/data'
import ProductoCard from '../components/ProductoCard'
import LineaCard from '../components/LineaCard'
import SmartImage from '../components/SmartImage'
import { ArrowRight, LeafIcon, SparkIcon, PlayIcon } from '../components/icons'

export default function Home() {
  const navigate = useNavigate()
  const disponibles = productosDisponibles()
  const mes = mesActualNombre()

  // Se calcula desde los datos en vez de fijarlo a mano: no se desactualiza
  // cuando se agrega una familia de un distrito nuevo.
  const distritos = new Set(emprendedores.map((e) => e.ubicacion.distrito.trim().toLowerCase()))

  const stats = [
    { valor: emprendedores.length, etiqueta: 'Emprendimientos' },
    { valor: lineas.length, etiqueta: 'Líneas de negocio' },
    { valor: distritos.size, etiqueta: 'Distritos de La Unión' },
  ]

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src={asset('portada.webp')}
            alt="Paisaje de La Unión, Arequipa"
            // Ken Burns lentísimo: la portada respira en vez de quedarse quieta.
            className="h-full w-full object-cover will-change-transform animate-ken-burns"
            style={{ objectPosition: 'center 60%' }}
          />
          {/* Velo en tres capas: legibilidad del texto a la izquierda, fundido al
              fondo de página abajo, y la foto respirando arriba a la derecha. */}
          <div className="absolute inset-0 bg-gradient-to-b from-night-975/55 via-night-975/70 to-night-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-night-975 via-night-975/70 to-transparent" />

          {/* Focos de luz a la deriva. Van sobre los velos (no debajo) para que
              tiñan la escena; en blur-3xl no compiten con el texto. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[6%] h-72 w-72 animate-float rounded-full bg-gold-400/18 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[-6rem] right-[28%] h-64 w-64 animate-float-slow rounded-full bg-field-500/12 blur-3xl"
          />
        </div>

        <div className="container-page relative py-20 sm:py-28 lg:py-36">
          {/* Entrada escalonada: cada elemento entra ~90 ms después del anterior.
              `fade-up` usa fill-mode both, así que el delay los mantiene ocultos
              hasta su turno en vez de parpadear. */}
          <div className="max-w-2xl">
            <span className="chip-gold animate-fade-up">
              <LeafIcon className="h-3.5 w-3.5" /> Programa Haku Wiñay · Noa Jayatai
            </span>

            <h1
              className="mt-6 animate-fade-up text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[3.75rem]"
              style={{ animationDelay: '90ms' }}
            >
              Productos del campo,
              <span className="text-sheen mt-1 block">hechos por manos de La Unión.</span>
            </h1>

            <p
              className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-slate-300 sm:text-lg"
              style={{ animationDelay: '180ms' }}
            >
              Conoce a las familias emprendedoras de la provincia de La Unión, Arequipa.
              Vinos artesanales, miel natural, truchas, cuyes, panadería y mucho más,
              directo del productor.
            </p>

            <div
              className="mt-8 flex animate-fade-up flex-wrap gap-3"
              style={{ animationDelay: '270ms' }}
            >
              <Link to="/emprendimientos" className="btn-primary">
                Explorar emprendimientos <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#temporada" className="btn-ghost">
                Productos de temporada
              </a>
            </div>

            {/* Stats en superficie propia: antes eran texto suelto sobre la foto
                y se perdían contra el paisaje. */}
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <div
                  key={s.etiqueta}
                  className="animate-fade-up rounded-xl border border-white/10 bg-night-900/70 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/30 hover:bg-night-850/80"
                  style={{ animationDelay: `${360 + i * 90}ms` }}
                >
                  <dt className="font-display text-2xl font-semibold text-gold-300 sm:text-3xl">
                    {s.valor}
                  </dt>
                  <dd className="mt-1 text-[11px] leading-tight text-slate-400">{s.etiqueta}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Indicador de scroll: cierra el hero y sugiere que hay más abajo. */}
          <a
            href="#temporada"
            className="focus-ring absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-fade-up flex-col items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-gold-300 sm:flex"
            style={{ animationDelay: '700ms' }}
          >
            Desliza
            {/* La rotación va en el <svg> y la animación en el wrapper: si
                comparten elemento, el transform del keyframe pisa al rotate-90
                y la flecha deja de apuntar hacia abajo. */}
            <span className="animate-nudge">
              <ArrowRight className="h-4 w-4 rotate-90" />
            </span>
          </a>
        </div>
      </section>

      {/* ===================== LÍNEAS DE NEGOCIO ===================== */}
      <section className="container-page py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">
              <span className="rule-gold" /> Nuestra oferta
            </span>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Líneas de negocio</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
              {lineas.length} rubros que reúnen el trabajo artesanal y sostenible de las familias
              productoras. Toca uno para ver quiénes lo trabajan.
            </p>
          </div>
          <Link
            to="/emprendimientos"
            className="focus-ring group inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-gold-300 hover:text-gold-200"
          >
            Ver todo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {lineas.map((l) => (
            <LineaCard
              key={l.id_linea}
              linea={l}
              count={contarPorLinea(l.id_linea)}
              onSelect={(id) => navigate(`/emprendimientos?linea=${id}`)}
            />
          ))}
        </div>
      </section>

      {/* ===================== PRODUCTOS DE TEMPORADA ===================== */}
      {/* Superficie más clara + filetes: corta el scroll y marca un bloque distinto. */}
      <section
        id="temporada"
        className="scroll-mt-20 border-y border-white/8 bg-night-900 py-16 sm:py-24"
      >
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">
                <SparkIcon className="h-4 w-4" /> Frescos · {mes}
              </span>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Productos de temporada</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
                Disponibles ahora mismo, en el mes de {mes}. Cada tarjeta muestra su calendario
                completo de temporada.
              </p>
            </div>
            {disponibles.length > 0 && (
              <span className="chip-field">
                {disponibles.length}{' '}
                {disponibles.length === 1 ? 'productor activo' : 'productores activos'}
              </span>
            )}
          </div>

          {disponibles.length === 0 ? (
            <p className="mt-10 rounded-2xl border border-white/8 bg-white/4 p-8 text-center text-slate-400">
              No hay productos destacados para este mes.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {disponibles.map((p) => (
                <ProductoCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===================== VIDEO ===================== */}
      <section className="container-page py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Conoce nuestro trabajo</span>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Historias que impulsan la comunidad
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Un vistazo a cómo las familias de La Unión transforman su producción en oportunidades.
          </p>
        </div>

        <div className="group relative mt-10 overflow-hidden rounded-3xl border border-white/10 shadow-elev-2">
          <video
            className="aspect-video w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={asset('portada.webp')}
          >
            <source src={asset('images/video.mp4')} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-975/50 to-transparent" />
          <span className="chip-overlay pointer-events-none absolute bottom-4 left-4">
            <PlayIcon className="h-3.5 w-3.5 text-gold-400" /> En reproducción
          </span>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="container-page pb-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold-400/25 bg-night-850 p-10 text-center shadow-elev-2 sm:p-16">
          {/* Foco dorado detrás del contenido, no un degradado que ensucia el texto */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl"
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              ¿Buscas producto directo del campo?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
              Contacta directamente con las familias productoras de La Unión y apoya la economía
              local de Arequipa.
            </p>
            <Link to="/emprendimientos" className="btn-primary mt-8">
              Ver todos los emprendimientos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
