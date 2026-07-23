// Resuelve rutas de assets estáticos respetando la ruta base del despliegue
// (import.meta.env.BASE_URL = '/Haku-Winay-Noa-Jayatai/' en GitHub Pages, '/' en local root).
// Codifica cada segmento porque muchas carpetas tienen espacios y acentos
// (p. ej. "Apicultura López", "Panadería Josué") que rompían las rutas antiguas.
const BASE = import.meta.env.BASE_URL

export function asset(path: string): string {
  const clean = path.replace(/^\/+/, '')
  const encoded = clean.split('/').map(encodeURIComponent).join('/')
  return BASE + encoded
}

/** Ruta a una imagen dentro de la carpeta de un emprendimiento. */
export function fotoEmprendimiento(nombre: string, archivo: string): string {
  return asset(`images/Fotos/${nombre}/${archivo}`)
}

/** Placeholder SVG (data URI) para imágenes que no cargan. No requiere red. */
export const IMG_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1D2027"/>
      <g fill="none" stroke="#333844" stroke-width="2">
        <circle cx="400" cy="270" r="70"/>
      </g>
      <path d="M360 300l30-34 26 30 20-22 44 48H340z" fill="#333844"/>
      <circle cx="378" cy="250" r="14" fill="#333844"/>
      <text x="400" y="430" fill="#7E7566" font-family="system-ui,sans-serif" font-size="26"
        text-anchor="middle">Imagen no disponible</text>
    </svg>`,
  )

/** Handler onError reutilizable: sustituye por el placeholder una sola vez. */
export function onImgError(e: React.SyntheticEvent<HTMLImageElement>): void {
  const img = e.currentTarget
  if (img.src !== IMG_PLACEHOLDER) {
    img.src = IMG_PLACEHOLDER
    img.dataset.fallback = 'true'
  }
}
