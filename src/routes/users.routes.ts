import { Router } from 'express';
import { celebrate, Segments, Joi, Modes } from 'celebrate';

import ListUsersUseCase from '../useCases/users/listUsers';
import GetUserUseCase from '../useCases/users/getUser';
import CreateUserUseCase from '../useCases/users/createUser';
import UserDto from '../dtos/userDto';
import UpdateUserUseCase from '../useCases/users/updateUser';
import DeleteUserUseCase from '../useCases/users/deleteUser';
import { isAuthenticated } from '../middlewares/auth';

/*
  GET: buscando dados;
  POST: criando dados;
  PUT: alterar dados;
  DELETE: excluir dados;
*/

/*
  Route params: quando queremos acessar algo específico, ou editar
  Query params: múltiplos parâmetros (ex: filtros)
  Request body: Não é GET, envia informações variadas
*/

// Todas as rotas de Users
const usersRoutes = Router();
usersRoutes.use(isAuthenticated);

// Listagem
usersRoutes.get('/', async (request, response) => {
    const useCase = new ListUsersUseCase();
    let users = await useCase.execute();
    users = users.map((x) => {
        delete x.password;
        return x;
    });
    return response.send(users);
});

// Pesquisa
usersRoutes.get('/:id', async (request, response) => {
    const { id } = request.params;
    const useCase = new GetUserUseCase();
    const user = await useCase.execute(id);

    if (!user) {
        return response.status(404).send();
    }
    delete user.password;
    return response.send(user);
});

// Cadastro
usersRoutes.post(
    '/',
    // celebrate(
    //     {
    //         [Segments.BODY]: Joi.object().keys({
    //             name: Joi.string().required(),
    //             email: Joi.string().required(),
    //             password: Joi.string().required(),
    //             roleid: Joi.string().uuid().required(),
    //         }),
    //     },
    //     {
    //         abortEarly: false,
    //     }
    // ),
    async (request, response) => {
        const useCase = new CreateUserUseCase();
        const user = await useCase.execute(request.body as UserDto);
        delete user.password;
        return response.status(201).send(user);
    }
);

// Edição
usersRoutes.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { name, email, roleId } = request.body as UserDto;
    const useCase = new UpdateUserUseCase();
    const user = await useCase.execute({
        id,
        name,
        email,
        roleId,
    });
    delete user.password;
    return response.send(user);
});

// Remoção
usersRoutes.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const useCase = new DeleteUserUseCase();
    await useCase.execute(id);
    return response.send({});
});

export default usersRoutes;
