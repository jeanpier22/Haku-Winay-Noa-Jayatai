import { LeafIcon, UsersIcon, SparkIcon, MapPinIcon } from '../components/icons'
import { emprendedores, lineas } from '../lib/data'

// Cada valor toma un acento distinto de la paleta: rompe la monotonía dorada
// y refuerza el significado (verde = sostenible, terracota = comunidad).
const valores = [
  {
    icon: LeafIcon,
    titulo: 'Producción sostenible',
    texto: 'Prácticas responsables con el medio ambiente y respeto por las tradiciones productivas de la zona.',
    tono: 'bg-field-500/15 text-field-300 ring-field-400/25',
  },
  {
    icon: UsersIcon,
    titulo: 'Trabajo familiar',
    texto: 'Cada emprendimiento nace del esfuerzo de familias organizadas que apuestan por el desarrollo local.',
    tono: 'bg-clay-500/15 text-clay-300 ring-clay-400/25',
  },
  {
    icon: SparkIcon,
    titulo: 'Calidad y frescura',
    texto: 'Productos frescos, artesanales y naturales, entregados directamente del productor al consumidor.',
    tono: 'bg-gold-400/15 text-gold-300 ring-gold-400/25',
  },
]

export default function Nosotros() {
  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="eyebrow">Quiénes somos</span>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
          Emprendimiento rural con identidad
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300">
          <strong className="text-white">Haku Wiñay / Noa Jayatai</strong> es un programa de
          FONCODES que impulsa el desarrollo productivo de las familias rurales del Perú. En la
          provincia de <strong className="text-white">La Unión, Arequipa</strong>, reúne a{' '}
          {emprendedores.length} emprendimientos organizados en {lineas.length} líneas de negocio,
          fortaleciendo la economía y la seguridad alimentaria de la comunidad.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {valores.map((v) => (
          <div key={v.titulo} className="card card-hover p-6">
            <div className={`grid h-11 w-11 place-items-center rounded-xl ring-1 ring-inset ${v.tono}`}>
              <v.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-white">{v.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{v.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-night-900 p-8 shadow-elev-1 sm:p-12">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Nuestra misión</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Fortalecer las capacidades productivas y de emprendimiento de las familias rurales,
              generando ingresos sostenibles y mejorando su calidad de vida a través de negocios
              locales de calidad.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Nuestra visión</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Ser un referente de desarrollo rural inclusivo, donde cada familia de La Unión pueda
              vivir dignamente de su trabajo, preservando sus tradiciones y su territorio.
            </p>
          </div>
        </div>
        <p className="mt-8 flex items-center gap-2 text-sm text-slate-400">
          <MapPinIcon className="h-4 w-4 text-gold-400" />
          Distritos de Charcana, Cotahuasi, Quechualla y alrededores — Provincia de La Unión, Arequipa.
        </p>
      </div>
    </div>
  )
}
