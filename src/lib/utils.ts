import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Une clases condicionales y resuelve conflictos de Tailwind (la última gana).
// Convención de shadcn/ui: todo componente de `components/ui` la usa para que
// el `className` que llega por props pueda sobrescribir los estilos base.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
