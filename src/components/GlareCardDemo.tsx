import { GlareCard } from '@/components/ui/glare-card'
import { LeafIcon } from './icons'

// Demo de referencia de <GlareCard />: las tres variantes de contenido (icono,
// foto a sangre y texto). Se monta en la sección "Vitrina" de Home.
export function GlareCardDemo() {
  return (
    <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-3">
      <GlareCard className="flex flex-col items-center justify-center">
        <LeafIcon className="h-14 w-14 text-gold-400" />
      </GlareCard>

      <GlareCard className="flex flex-col items-center justify-center">
        <img
          className="h-full w-full absolute inset-0 object-cover"
          src="https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=1200&auto=format&fit=crop"
          alt="Manos sosteniendo productos de campo"
          loading="lazy"
        />
      </GlareCard>

      <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
        <p className="font-display font-bold text-slate-100 text-lg">Hecho en La Unión</p>
        <p className="font-normal text-base text-slate-300 mt-4">
          Cada emprendimiento nace de una familia que trabaja su chacra y decide
          convertir lo que cosecha en un producto con nombre propio.
        </p>
      </GlareCard>
    </div>
  )
}
