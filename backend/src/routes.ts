import { Router } from "express";

import auth from "./middlewares/auth";
import SessionController from "./controllers/SessionController";
import UsersController from "./controllers/UsersController";

const routes = Router();

routes.post('/login', SessionController.createLogin);

routes.use(auth);

routes.post('/login/create', SessionController.createAdmin);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

export default routes;