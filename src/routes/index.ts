import 'express-async-errors';
import { Router } from 'express';
import AuthRoutes from './auth.routes';
import UsersRoutes from './users.routes';

// Todas as rotas da nossa aplicação
const routes = Router();
routes.use('/auth', AuthRoutes);
routes.use('/users', UsersRoutes);

export default routes;
