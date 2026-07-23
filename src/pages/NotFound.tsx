import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/icons'

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[50vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-gold-400">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Página no encontrada</h1>
        <p className="mt-2 text-slate-400">La página que buscas no existe o fue movida.</p>
        <Link to="/" className="btn-primary mt-6">
          Volver al inicio <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
