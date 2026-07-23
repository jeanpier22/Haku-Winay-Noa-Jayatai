import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// BrowserRouter da URLs limpias (/emprendimientos en vez de /#/emprendimientos).
// Depende de que el servidor devuelva index.html en cualquier ruta: eso lo
// resuelve el rewrite de vercel.json. Un hosting sin esa regla daría 404 al
// recargar una ruta interna.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
