# Haku Wiñay · Noa Jayatai

Vitrina web de los **emprendimientos rurales de la provincia de La Unión, Arequipa**,
del programa Haku Wiñay / Noa Jayatai (FONCODES). Muestra las familias productoras,
sus líneas de negocio y los productos disponibles por temporada.

Reescrito desde un sitio HTML/CSS/JS estático a una **SPA en React + TypeScript + Vite**.

## Stack

- **React 18** + **TypeScript** + **React Router 6** (HashRouter para GitHub Pages)
- **Vite 5** como bundler
- **Tailwind CSS 3** con un sistema de diseño propio (tema oscuro + dorado)

## Desarrollo

Requiere **Node 20 o superior** (es la versión que usa el workflow de despliegue).

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # compila a /dist
npm run preview  # sirve el build de producción
```

## Rutas del sitio

Al usar `HashRouter`, todas las URLs llevan `#`:

| Ruta                     | Página                                              |
| ------------------------ | --------------------------------------------------- |
| `#/`                     | Inicio: hero, líneas, productos de temporada, video |
| `#/emprendimientos`      | Directorio con filtro por línea                     |
| `#/emprendimientos?linea=VINOS` | Directorio prefiltrado (el filtro vive en la URL) |
| `#/emprendimiento/:id`   | Ficha completa (el `:id` es el campo `id` del JSON) |
| `#/nosotros`             | Programa, misión y visión                           |
| `#/contacto`             | Datos de contacto                                   |
| cualquier otra           | Página 404                                          |

## Estructura

```
public/
  images/            Fotos, logos, líneas y video (assets estáticos)
  portada.jpeg
src/
  data/              JSON de emprendedores, líneas y productos de temporada
  lib/
    assets.ts        Resolución de rutas (base path + encode) y fallback de imágenes
    data.ts          Acceso y helpers tipados sobre los datos
    useGaleria.ts    Hook que detecta las fotos numeradas de cada galería
  components/        Header, Footer, Layout, tarjetas, SmartImage, Lightbox, iconos
  pages/             Home, Emprendimientos, EmprendimientoDetalle, Nosotros, Contacto, 404
  types.ts           Tipos del dominio (Emprendedor, Linea, ProductoTemporada)
```

## Cómo agregar un emprendimiento nuevo

Son **tres pasos**: crear la carpeta de fotos, agregar el registro en el JSON y
(opcional) declarar sus meses de temporada.

### 1. Crear la carpeta de fotos

```
public/images/Fotos/<nombre_emprendimiento>/
```

> ⚠️ El nombre de la carpeta debe ser **idéntico** al campo `nombre_emprendimiento`
> del JSON, con las mismas mayúsculas y tildes. Es así como el código encuentra las
> imágenes (`src/lib/assets.ts` → `fotoEmprendimiento`). Los espacios y acentos ya se
> codifican solos, no hace falta renombrar nada a `snake_case`.

Dentro van dos tipos de archivo, **todos en `.jpeg`**:

| Archivo             | Uso                                                     | ¿Obligatorio? |
| ------------------- | ------------------------------------------------------- | ------------- |
| `portada.jpeg`      | Imagen de la tarjeta en el directorio y cabecera de ficha | Sí           |
| `mision.jpeg`       | Ilustra la misión en la ficha                            | Recomendado   |
| `vision.jpeg`       | Ilustra la visión y las tarjetas de temporada            | Recomendado   |
| `participacion.jpeg`| Foto de la familia / equipo                              | Opcional      |
| `1.jpeg`, `2.jpeg`… | Galería de la ficha                                      | Opcional      |

**Convención de la galería — importante:**

`src/lib/useGaleria.ts` prueba `1.jpeg`, `2.jpeg`, `3.jpeg`… y **se detiene en el primer
número que falta**. La numeración debe ser correlativa desde 1, sin huecos:

- ✅ `1.jpeg, 2.jpeg, 3.jpeg` → se muestran las 3
- ❌ `1.jpeg, 2.jpeg, 4.jpeg` → solo se muestran 2; la `4` nunca aparece
- ❌ `0.jpeg` o `1.jpg` (sin la `e`) → no se detectan

El límite son **12 fotos** por galería. Cualquier otro archivo suelto en la carpeta
(por ejemplo `asd.jpeg`) simplemente se ignora.

### 2. Agregar el registro en `src/data/emprendedores.json`

Usa un `id` **único y que no se repita** — es el que va en la URL `#/emprendimiento/:id`:

```json
{
  "id": 21,
  "id_linea": "VINOS",
  "linea_negocio": "VINO ARTESANAL",
  "nombre_emprendimiento": "Vinos del Valle",
  "rubro": "ELABORACION Y VENTA DE VINO ARTESANAL",
  "descripcion": "Texto de presentación del emprendimiento…",
  "mision": "…",
  "vision": "…",
  "celular": "999888777",
  "correo": "correo@ejemplo.com",
  "ubicacion": {
    "departamento": "Arequipa",
    "provincia": "La Unión",
    "distrito": "Cotahuasi",
    "localidad": "Piro"
  },
  "maps": "https://maps.google.com/…",
  "integrantes": {
    "presidente": "Nombre Apellido",
    "secretario": "Nombre Apellido",
    "tesorero": "Nombre Apellido"
  }
}
```

> El `id_linea` **debe existir** en `src/data/lineas.json` (`PORCINOS`, `HUEVOS`,
> `CUYES`, `VINOS`, `HOSPEDAJE`, …). Si no coincide, el emprendimiento no aparece en
> ningún filtro por línea. Los tipos completos están en `src/types.ts`.

### 3. Declarar los meses de temporada (opcional)

Si el emprendimiento debe salir en la sección **"Productos de temporada"** del inicio,
agrégalo a `src/data/productos_temporada.json`:

```json
{
  "id": 21,
  "linea": "Vino Artesanal",
  "nombre": "Vinos del Valle",
  "rubro": "Elaboración y venta de vino artesanal",
  "productos": "Vino tinto, vino blanco y pisco",
  "meses": [1, 2, 3, 11, 12]
}
```

- `meses` es un array de números del **1 (enero) al 12 (diciembre)**. El sitio muestra
  automáticamente solo los productos cuyo array incluye el mes actual.
- El `id` debe ser **el mismo `id` del emprendimiento** en `emprendedores.json`: es la
  llave que usa la tarjeta para resolver la foto y el enlace "Contactar productor".
  Si no coincide con ninguno, la tarjeta se muestra sin imagen ni enlace.

## Despliegue

Se publica automáticamente en **GitHub Pages** con el workflow
`.github/workflows/static.yml` en cada push a `main` (compila con Vite y sube `/dist`).

> La primera vez hay que activarlo en GitHub: **Settings → Pages → Source: GitHub
> Actions**. Si queda en "Deploy from a branch", el build pasa pero el despliegue falla.

> La ruta base está fijada en `vite.config.ts` como `/Haku-Winay-Noa-Jayatai/`
> para que coincida con el nombre del repositorio. Si cambias el repo o usas un
> dominio propio, actualiza `base`.

## Notas de la migración

- Rutas de imágenes ahora respetan la base del despliegue y **codifican espacios/acentos**
  (antes se rompían en carpetas como "Apicultura López").
- Los datos se buscan por `id` real, no por posición en el array.
- Imágenes con carga fallida muestran un placeholder en vez de romperse.
- El proyecto original se conservó en la carpeta [`legacy/`](./legacy) como referencia.
