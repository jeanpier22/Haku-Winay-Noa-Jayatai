import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Emprendimientos from './pages/Emprendimientos'
import EmprendimientoDetalle from './pages/EmprendimientoDetalle'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="emprendimientos" element={<Emprendimientos />} />
        <Route path="emprendimiento/:id" element={<EmprendimientoDetalle />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
