import { MESES_INICIAL, mesActualNumero, rangosDeMeses } from '../lib/data'

interface Props {
  /** Meses disponibles en formato 1–12, tal como vienen del JSON. */
  meses: number[]
  /** Oculta las iniciales cuando la tarjeta es muy angosta. */
  compacto?: boolean
}

/**
 * Franja de 12 segmentos que responde de un vistazo a "¿cuándo puedo comprar esto?".
 * El dato `meses` ya existía en los datos pero no se mostraba en pantalla: el usuario
 * solo veía "disponible este mes" sin saber hasta cuándo ni cuándo vuelve.
 */
export default function DisponibilidadMeses({ meses, compacto = false }: Props) {
  const actual = mesActualNumero()
  const activos = new Set(meses)

  return (
    <div
      role="img"
      aria-label={`Disponible en ${rangosDeMeses(meses) || 'ningún mes registrado'}`}
      className="select-none"
    >
      <div className="flex gap-[3px]" aria-hidden>
        {MESES_INICIAL.map((inicial, i) => {
          const mes = i + 1
          const disponible = activos.has(mes)
          const esActual = mes === actual

          return (
            <div key={mes} className="flex flex-1 flex-col items-center gap-1">
              <span
                title={`${inicial} — ${disponible ? 'disponible' : 'fuera de temporada'}`}
                className={[
                  'h-1.5 w-full rounded-full transition-colors',
                  disponible ? 'bg-field-400' : 'bg-night-700',
                  esActual ? 'ring-2 ring-gold-400 ring-offset-1 ring-offset-night-850' : '',
                ].join(' ')}
              />
              {!compacto && (
                <span
                  className={[
                    'text-[9px] font-semibold leading-none',
                    esActual
                      ? 'text-gold-300'
                      : disponible
                        ? 'text-slate-400'
                        : 'text-slate-600',
                  ].join(' ')}
                >
                  {inicial}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
