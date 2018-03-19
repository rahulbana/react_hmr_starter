
export async function isAuthorize(ctx, next) {
  ctx.throw(401)
  await next()
}
