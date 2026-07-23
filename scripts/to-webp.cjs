// Convierte jpeg/jpg/png de public/ a WebP, conservando ruta y nombre base.
// No borra los originales: eso se hace en un paso aparte tras verificar.
//
// Uso (sharp no está en devDependencies para no ralentizar el build de CI):
//   npm i -D sharp && node scripts/to-webp.cjs && npm uninstall sharp
//
// Cuidado: dos archivos con el mismo nombre base y distinta extensión
// (vision.jpeg + vision.jpg) escriben el mismo .webp y uno pisa al otro.
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ROOT = 'public'
const EXTS = /\.(jpe?g|png)$/i
const MAX_W = 1920
const QUALITY = 82

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name)
    if (f.isDirectory()) walk(p, out)
    else if (EXTS.test(f.name)) out.push(p)
  }
  return out
}

;(async () => {
  const files = walk(ROOT)
  let antes = 0
  let despues = 0
  let ok = 0
  const fallos = []

  for (const src of files) {
    const dest = src.replace(EXTS, '.webp')
    try {
      await sharp(src)
        .rotate() // respeta la orientación EXIF antes de perderla
        .resize({ width: MAX_W, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(dest)
      antes += fs.statSync(src).size
      despues += fs.statSync(dest).size
      ok++
    } catch (e) {
      fallos.push(`${src}: ${e.message}`)
    }
  }

  const mb = (b) => (b / 1048576).toFixed(1)
  console.log(`convertidas: ${ok}/${files.length}`)
  console.log(`antes:   ${mb(antes)} MB`)
  console.log(`despues: ${mb(despues)} MB`)
  console.log(`ahorro:  ${mb(antes - despues)} MB (${(100 - (despues / antes) * 100).toFixed(1)}%)`)
  if (fallos.length) {
    console.log('--- FALLOS ---')
    fallos.forEach((f) => console.log(f))
  }
})()
