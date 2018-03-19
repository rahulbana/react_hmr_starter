import Koa from 'koa';
import { createReadStream } from '.././utils/fs'
import serve from 'koa-static';
import views from 'koa-views';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import path from 'path';
import { errorHandler } from './middleware/error';
import routes from './routes/index';

import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev.js'
import koaWebpackDevMiddleware from 'koa-webpack-dev-middleware'
import koaWebpackHotMiddleware from 'koa-webpack-hot-middleware'

const app = new Koa();
const root = process.cwd();
const port = process.env.PORT;
const env = process.env.NODE_ENV;

app.use(views('views', {
  map: {
    html: 'handlebars'
  }
}))
app.use(convert(serve('public')))
app.use(logger())
app.use(bodyParser())

mongoose.Promise = require('bluebird')
mongoose
.connect('mongodb://127.0.0.1/eserverDB')
.then((response) => {
	console.log('mongo connection created')
})
.catch((err) => {
	console.log("Error connecting to Mongo")
	console.log(err);
})

app.use(errorHandler)

/*
app.use(async(ctx, next) => {
  try {
    console.log(ctx.status)
    await next()
    if (ctx.status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    if (ctx.status === 404) {
      ctx.status = 404
      await ctx.render('404')
      //ctx.body = { status: false, msg: 'Not Found.'}
    }
    if (ctx.status === 401) {
      ctx.status = 401
      ctx.body = { status: false, msg: 'Unauthorize.'}
    }
  }
})*/

routes(app)

if (env === 'development') {
  // Load dev webpack config
  const compiler = webpack(webpackConfig)

  // Serve assets from memory
  app.use(convert(koaWebpackDevMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  })))

  // Webpack Hot reloading.
  app.use(convert(koaWebpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  })))
}

const server = app.listen(port, () => {
  console.log(`Server listening running on : http://localhost:${port}/ in ${env} mode`);
});

module.exports = server;
