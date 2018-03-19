import { createReadStream } from '../.././utils/fs'

const root = process.cwd();

export async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.type = 'html'
    if (err.status === 401) {
      ctx.body = createReadStream('401.html')
    } else {
      err.status = 404;
      ctx.body = createReadStream('404.html')
    }
  }
}
