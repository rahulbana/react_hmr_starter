import baseRoutes from './base';
import userRoutes from './user';

module.exports = (app) => {
  app.use(baseRoutes.routes());
  app.use(userRoutes.routes());
}
