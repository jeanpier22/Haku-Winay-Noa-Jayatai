/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
// SISTEMA DE DISEÑO — Haku Wiñay · Noa Jayatai
//
// Criterios del tema oscuro:
//  1. El fondo NO es negro puro: un carbón cálido (tinte ámbar) que hace que el
//     dorado y las fotos de campo se sientan integrados y no pegados encima.
//  2. Las superficies suben en escalones AMPLIOS y visibles (950 → 900 → 850 → 800).
//     La versión anterior tenía saltos de ~5% de luminancia: por eso todo se veía
//     plano y "apagado".
//  3. Los neutros de texto son cálidos, no azulados. Se sobrescribe `slate` de
//     Tailwind con una rampa arena para que todo el texto del sitio deje de verse
//     grisáceo y muerto sobre el fondo cálido.
//  4. Los acentos tienen rol semántico fijo:
//       gold  → marca, CTA, enlaces
//       field → frescura / "disponible ahora"
//       clay  → categorías y datos secundarios
// ─────────────────────────────────────────────────────────────────────────────

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Habilita cualquier modificador de opacidad (bg-white/8, border-white/15, …)
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [i, (i / 100).toString()]),
      ),

      colors: {
        // ── Superficies. Carbón cálido, escalones amplios para que haya jerarquía.
        night: {
          975: '#08090B', // velos sobre foto (hero)
          950: '#0E0F12', // fondo de página
          900: '#16181D', // secciones alternas
          850: '#1D2027', // tarjetas
          800: '#262A33', // tarjeta elevada / hover
          700: '#333844', // bordes marcados
          600: '#434A59', // bordes/iconografía apagada
          500: '#5A6273',
        },

        // ── Neutros de texto: SOBRESCRIBE el `slate` frío de Tailwind por arena
        //    cálida. Un solo cambio que corrige el tono de todo el texto del sitio.
        slate: {
          50: '#FBF9F6',
          100: '#F3EFE9',
          200: '#E8E3DB', // texto fuerte sobre oscuro
          300: '#CFC8BD', // cuerpo
          400: '#A79E90', // secundario (≈7:1 sobre night-950)
          500: '#7E7566', // sutil / metadatos
          600: '#5C5449',
          700: '#443E36',
          800: '#2E2A25',
          900: '#1C1A17',
        },

        // ── Dorado de marca. Más luminoso y saturado que la versión anterior:
        //    antes solo se usaba al 10–30% de opacidad y nunca llegaba a brillar.
        gold: {
          50: '#FEFAF0',
          100: '#FDF1CE',
          200: '#FBE29C',
          300: '#F8CE5F',
          400: '#F2B92B', // acento principal
          500: '#DC9C12',
          600: '#B47710',
          700: '#8C5A13',
          800: '#714717',
          900: '#5E3A18',
        },

        // ── Verde chacra: frescura y disponibilidad. Antes era un verde apagado
        //    que no leía como "fresco".
        field: {
          300: '#A5E48C',
          400: '#7FCF6B',
          500: '#58AE4C',
          600: '#3F8A3B',
          700: '#2F6830',
          800: '#254E26',
        },

        // ── Terracota andina: categorías, acentos secundarios, datos de ficha.
        clay: {
          300: '#F5B08F',
          400: '#E88C64',
          500: '#CE6941',
          600: '#A84E2D',
          700: '#7F3B23',
        },
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'ui-serif', 'serif'],
      },

      // En oscuro la elevación NO se logra con sombra negra (es invisible sobre
      // negro), sino con una superficie más clara + un filo superior de luz.
      boxShadow: {
        'elev-1':
          'inset 0 1px 0 0 rgba(255,255,255,.06), 0 1px 2px rgba(0,0,0,.5), 0 10px 28px -14px rgba(0,0,0,.75)',
        'elev-2':
          'inset 0 1px 0 0 rgba(255,255,255,.09), 0 4px 10px rgba(0,0,0,.45), 0 28px 56px -22px rgba(0,0,0,.9)',
        glow: '0 0 0 1px rgba(242,185,43,.30), 0 18px 44px -18px rgba(242,185,43,.45)',
        'glow-field': '0 0 0 1px rgba(127,207,107,.28), 0 18px 40px -20px rgba(88,174,76,.40)',
        // Mantiene compatibilidad con clases previas
        card: 'inset 0 1px 0 0 rgba(255,255,255,.06), 0 1px 2px rgba(0,0,0,.5), 0 10px 28px -14px rgba(0,0,0,.75)',
      },

      backgroundImage: {
        grain: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,.045) 1px, transparent 0)',
        'gold-sheen': 'linear-gradient(135deg, #F8CE5F 0%, #F2B92B 45%, #DC9C12 100%)',
      },

      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Brillo que recorre el borde/superficie en hover de las tarjetas destacadas
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120%)' },
        },
        // Pulso suave del punto "disponible ahora"
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.55', transform: 'scale(.82)' },
        },

        // ── Hero ────────────────────────────────────────────────────────────
        // Ken Burns: la foto de portada nunca queda quieta. El recorrido es
        // mínimo (10% de escala) y muy lento: se percibe como "vivo", no como
        // un zoom. Arranca ya escalado para que el desplazamiento no descubra
        // los bordes de la imagen.
        'ken-burns': {
          '0%': { transform: 'scale(1.06) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.16) translate3d(-1.5%, -2%, 0)' },
        },
        // Barrido del degradado dorado sobre el titular.
        sheen: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Deriva de los focos de luz del hero. Dos duraciones distintas evitan
        // que se muevan en bloque y delaten la animación.
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(1.5rem, -1.25rem, 0)' },
        },
        // Empujoncito del indicador de scroll
        nudge: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '.55' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },

      animation: {
        'fade-up': 'fade-up .55s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fade-in .6s ease both',
        shimmer: 'shimmer 1.4s cubic-bezier(.4,0,.2,1)',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'ken-burns': 'ken-burns 28s ease-in-out infinite alternate',
        sheen: 'sheen 7s ease-in-out infinite',
        float: 'float 11s ease-in-out infinite',
        'float-slow': 'float 17s ease-in-out infinite',
        nudge: 'nudge 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
