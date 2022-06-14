import { Router } from 'express';
import User from '../models/User';

import ListUsersUseCase from '../useCases/users/listUsers';
import GetUserUseCase from '../useCases/users/getUser';
import CreateUserUseCase from '../useCases/users/createUser';
import UserDto from '../dtos/userDto';
import UpdateUserUseCase from '../useCases/users/updateUser';
import DeleteUserUseCase from '../useCases/users/deleteUser';

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

// Listagem
usersRoutes.get('/', async (request, response) => {
  const useCase = new ListUsersUseCase();
  const users = await useCase.execute();
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
  return response.send(user);
});

// Cadastro
usersRoutes.post('/', async (request, response) => {
  const useCase = new CreateUserUseCase();
  const user = await useCase.execute(request.body as UserDto);
  return response.status(201).send(user);
});

// Edição
usersRoutes.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, password } = request.body as User;
  const useCase = new UpdateUserUseCase();
  const user = await useCase.execute({
    id,
    name,
    email,
    password,
    roleId: '',
  });
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
