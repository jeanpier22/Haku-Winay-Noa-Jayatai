import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { asset } from '../lib/assets'
import { emprendedores, lineas, contarPorLinea } from '../lib/data'
import EmprendimientoCard from '../components/EmprendimientoCard'
import SmartImage from '../components/SmartImage'

export default function Emprendimientos() {
  const [params, setParams] = useSearchParams()
  const activa = params.get('linea') ?? 'todas'

  const filtrados = useMemo(
    () =>
      activa === 'todas'
        ? emprendedores
        : emprendedores.filter((e) => e.id_linea === activa),
    [activa],
  )

  const seleccionar = (id: string) => {
    if (id === 'todas') setParams({}, { replace: true })
    else setParams({ linea: id }, { replace: true })
  }

  const chipClass = (activo: boolean) =>
    [
      'focus-ring inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
      activo
        ? 'bg-gold-sheen text-night-975 font-semibold shadow-glow'
        : 'border border-white/12 bg-white/6 text-slate-300 hover:border-gold-400/40 hover:bg-white/10 hover:text-white',
    ].join(' ')

  return (
    <>
      {/* Hero compacto */}
      <section className="relative overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <SmartImage
            src={asset('portada.webp')}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 60%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night-975/85 via-night-975/80 to-night-950" />
        </div>
        <div className="container-page relative py-14 sm:py-20">
          <span className="eyebrow">
            <span className="rule-gold" /> Directorio
          </span>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Nuestros emprendimientos</h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {emprendedores.length} familias productoras de La Unión, Arequipa. Filtra por línea
            de negocio para encontrar lo que buscas.
          </p>
        </div>
      </section>

      <section className="container-page py-10">
        {/* Filtros. El contador dentro de cada chip evita entrar a una línea vacía. */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por línea de negocio">
          <button
            className={chipClass(activa === 'todas')}
            aria-pressed={activa === 'todas'}
            onClick={() => seleccionar('todas')}
          >
            Todas
            <span className="text-xs opacity-70">{emprendedores.length}</span>
          </button>
          {lineas.map((l) => (
            <button
              key={l.id_linea}
              className={chipClass(activa === l.id_linea)}
              aria-pressed={activa === l.id_linea}
              onClick={() => seleccionar(l.id_linea)}
            >
              <span aria-hidden>{l.icono}</span>
              {l.nombre}
              <span className="text-xs opacity-70">{contarPorLinea(l.id_linea)}</span>
            </button>
          ))}
        </div>

        {/* Resultados */}
        <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
          {filtrados.length} {filtrados.length === 1 ? 'resultado' : 'resultados'}
        </p>

        {filtrados.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/8 bg-white/4 p-10 text-center">
            <p className="text-slate-400">No hay emprendimientos en esta línea.</p>
            <button
              onClick={() => seleccionar('todas')}
              className="btn-ghost mt-5"
            >
              Ver todos
            </button>
          </div>
        ) : (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((e) => (
              <EmprendimientoCard key={e.id} e={e} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
