import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/api/test', (ctx) => {
  ctx.body = 'Hello, Koa with TypeScript!'
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(65244, () => {
  console.log('Server is running!')
})
