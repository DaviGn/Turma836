import express from 'express';
import cors from 'cors';
import logMiddleware from './middlewares/logs';
import routes from './routes';
import errorsMiddleware from './middlewares/errors';
import AppDataSource from './db/context';
import Role from './models/Role';

function runServer() {
    // Definir os middlewares
    const server = express();
    // Arquivos estáticos
    server.use('/img', express.static(`${__dirname}/img`));
    server.use(cors());
    server.use(express.json());
    server.use(logMiddleware);
    server.use(routes);
    server.use(errorsMiddleware);

    server.listen(3333, () => {
        console.log('Server is running!');
    });
}

// SEED
AppDataSource.initialize()
    .then((context) => {
        const adminRole = new Role();
        adminRole.id = '5be3f402-0c14-4ece-90a1-121bebae2a00';
        adminRole.name = 'Administrator';
        context.manager.save(adminRole);

        runServer();
    })
    .catch((err) => {
        console.log(err);
        console.log('Server stopped!');
    });
