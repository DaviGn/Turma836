import express from 'express';
import cors from 'cors';
import logMiddleware from './middlewares/logs';
import routes from './routes';
import errorsMiddleware from './middlewares/errors';

// Definir os middlewares
const server = express();
server.use(cors());
server.use(express.json());
server.use(logMiddleware);
server.use(routes);
server.use(errorsMiddleware);

server.listen(3333, () => {
  console.log('Server is running!');
});
