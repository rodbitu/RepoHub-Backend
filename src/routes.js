import { Router } from 'express';
import auth from './middlewares/auth.js';
import UsersController from './controllers/UsersController.js';
import RespositoriesController from './controllers/RespositoriesController.js';
import SessionsController from './controllers/SessionsController.js';

const routes = new Router();

routes.post('/sessions', SessionsController.create);

routes.use(auth);

routes.post('/users', UsersController.create);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

routes.post('/users/:user_id/repositories', RespositoriesController.create);
routes.get('/users/:user_id/repositories', RespositoriesController.index);
routes.get('/users/:user_id/repositories/:id', RespositoriesController.show);
routes.put('/users/:user_id/repositories/:id', RespositoriesController.update);
routes.delete(
  '/users/:user_id/repositories/:id',
  RespositoriesController.delete,
);

export default routes;
