import express, { Request } from 'express';
import { v4 } from 'uuid';

const server = express();
server.use(express.json());

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

/*
{
  id,
  name,
  email,
  password
}
*/

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

let users: User[] = [];
// let users: Array<User> = [];

server.get('/', (request, response) => {
  return response.send('Hello World!');
});

// Listagem
server.get('/users', (request, response) => {
  return response.send(users);
});

// Pesquisa
server.get('/users/:id', (request, response) => {
  const { id } = request.params;
  const user = users.find((x) => x.id === id);
  return response.send(user);
});

// Cadastro
server.post('/users', (request, response) => {
  const { name, email, password } = request.body as User;

  const id = v4();
  const user = {
    id,
    name,
    email,
    password,
  };

  users.push(user);

  return response.send(user);
});

// Edição
server.put('/users/:id', (request, response) => {
  const { id } = request.params;
  const { name, email, password } = request.body as User;

  const userIndex = users.findIndex((x) => x.id === id);
  const user = {
    id,
    name,
    email,
    password,
  };
  users[userIndex] = user;

  return response.send(user);
});

// Remoção
server.delete('/users/:id', (request, response) => {
  const { id } = request.params;
  users = users.filter((x) => x.id !== id);
  return response.send({});
});

server.listen(3333, () => {
  console.log('Server is running!');
});
