import Koa from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'

import fs from 'node:fs'
import { compressImage, deUrl, getFiles } from './utils'

const file404 = fs.readFileSync('src/404.png')

const app = new Koa()
const router = new Router()

router.get(/^\/api\/img\/(.*)$/, async (ctx) => {
  const dir = deUrl('/' + ctx.params[0])
  console.log(dir)

  let file = await compressImage(dir)
  if (!file) file = file404

  ctx.set('Content-Type', 'image/jpeg')
  ctx.set('Content-Disposition', `inline; filename="image.jpeg"`)

  ctx.body = file
})

router.get(/^\/api\/readdir\/(.*)$/, (ctx) => {
  const dir = deUrl('/' + ctx.params[0])
  console.log(dir)

  const files = getFiles(dir)
  console.log(files)
  ctx.body = files
})

app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(65244, () => {
  console.log('Server is running!')
})
