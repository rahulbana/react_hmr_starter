import Router from 'koa-router';
import { createUser, deleteUser, getUser, getUserById, updateUser } from '.././controllers/user'
const userRoutes = new Router({
  prefix: '/api/v1'
});

userRoutes
  .get('/users', getUser)
  .post('/user', createUser)
  .get('/user/:id', getUserById)
  .put('/user/:id', updateUser)
  .delete('/user/:id', deleteUser)
  .get('/v2', async (ctx) => {
    ctx.body = {
      status: true,
      message: 'v2'
    };
  })

export default userRoutes;
