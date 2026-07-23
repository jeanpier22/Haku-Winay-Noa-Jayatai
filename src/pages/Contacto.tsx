import { Link } from 'react-router-dom'
import { PhoneIcon, MailIcon, MapPinIcon, ArrowRight } from '../components/icons'

export default function Contacto() {
  return (
    <div className="container-page py-16 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Contáctanos</span>
        <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Hablemos</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-300">
          ¿Te interesa un producto o quieres apoyar a los emprendimientos de La Unión? Escríbenos
          o contacta directamente con cada familia productora desde su ficha.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-3">
        <div className="card p-6 text-center">
          <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
            <MapPinIcon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-base font-semibold text-white">Ubicación</h3>
          <p className="mt-1 text-sm text-slate-400">La Unión, Arequipa — Perú</p>
        </div>
        <div className="card p-6 text-center">
          <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
            <MailIcon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-base font-semibold text-white">Correo</h3>
          <p className="mt-1 break-all text-sm text-slate-400">contacto@hakuwinay.pe</p>
        </div>
        <div className="card p-6 text-center">
          <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gold-400/15 text-gold-300">
            <PhoneIcon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-base font-semibold text-white">Programa</h3>
          <p className="mt-1 text-sm text-slate-400">Haku Wiñay / Noa Jayatai — FONCODES</p>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl border border-gold-400/25 bg-night-850 p-8 text-center shadow-elev-2 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-52 w-[30rem] -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl"
        />
        <div className="relative">
          <h2 className="text-2xl font-semibold">Contacta a un productor</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
            Cada emprendimiento tiene su teléfono y correo en su ficha. Explora el directorio y
            elige con quién quieres hablar.
          </p>
          <Link to="/emprendimientos" className="btn-primary mt-6">
            Ir al directorio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
