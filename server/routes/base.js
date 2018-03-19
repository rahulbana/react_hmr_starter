import Router from 'koa-router';
import { isAuthorize } from '.././middleware/authorization'

const baseRoutes = new Router();

baseRoutes.get('/', async (ctx) => {
  //ctx.type = 'text/html'
  //ctx.body = `<html><body><h1>fasfasfasd</h1></body></html>`
  await ctx.render('index')
  //console.log(44)
  //ctx.throw(401)
})

export default baseRoutes;
