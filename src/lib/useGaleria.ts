import { useEffect, useState } from 'react'
import { fotoEmprendimiento } from './assets'

export interface Galeria {
  urls: string[]
  /** Sigue probando imágenes. Permite distinguir "cargando" de "no hay fotos". */
  cargando: boolean
}

/**
 * Detecta cuántas imágenes numeradas (1.webp, 2.webp, …) existen en la carpeta
 * del emprendimiento, probándolas en orden hasta la primera que falla.
 * Reemplaza la recursión de <img>.onload del proyecto original.
 */
export function useGaleria(nombre: string | undefined, max = 12): Galeria {
  const [galeria, setGaleria] = useState<Galeria>({ urls: [], cargando: true })

  useEffect(() => {
    if (!nombre) {
      setGaleria({ urls: [], cargando: false })
      return
    }

    let cancelado = false
    const encontradas: string[] = []

    const terminar = () => {
      if (!cancelado) setGaleria({ urls: [...encontradas], cargando: false })
    }

    const probar = (n: number) => {
      if (cancelado) return
      if (n > max) {
        terminar()
        return
      }
      const url = fotoEmprendimiento(nombre, `${n}.webp`)
      const img = new Image()
      img.onload = () => {
        if (cancelado) return
        encontradas.push(url)
        setGaleria({ urls: [...encontradas], cargando: true })
        probar(n + 1)
      }
      // La primera que falta cierra la secuencia: la numeración debe ser correlativa.
      img.onerror = terminar
      img.src = url
    }

    setGaleria({ urls: [], cargando: true })
    probar(1)

    return () => {
      cancelado = true
    }
  }, [nombre, max])

  return galeria
}
