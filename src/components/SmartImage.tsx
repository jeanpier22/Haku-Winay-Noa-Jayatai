import { useState } from 'react'
import { onImgError } from '../lib/assets'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

/**
 * <img> con estado de carga (skeleton) y fallback automático a placeholder.
 * Resuelve el problema de imágenes rotas del proyecto original.
 */
export default function SmartImage({ src, alt, className = '', ...rest }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        onImgError(e)
        setLoaded(true)
      }}
      className={`${className} ${loaded ? '' : 'animate-pulse bg-night-700'}`}
      {...rest}
    />
  )
}
