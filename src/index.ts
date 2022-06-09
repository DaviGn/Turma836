import express, { Request, Response } from 'express';
import cors from 'cors';
import { v4 } from 'uuid';

const server = express();
server.use(cors());
server.use(express.json());

async function logMiddleware(request: Request, response: Response, next: any) {
  const { method, url } = request;
  const requestLabel = `${method} ${url}`;
  console.log(requestLabel);
  console.time();
  await next();
  console.timeEnd();
}

server.use(logMiddleware);

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

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type ResponseError = {
  field: string;
  message: string;
};

let users: User[] = [];
// let users: Array<User> = [];

server.get('/', (request, response) => {
  return response.send('Hello World!');
});

// Listagem
server.get('/users', (request, response) => {
  const { name } = request.query;

  let usersToFilter = users;

  if (name) {
    usersToFilter = users.filter((x) =>
      x.name.toUpperCase().includes(name.toUpperCase())
    );
  }

  return response.send(usersToFilter);
});

// Pesquisa
server.get('/users/:id', (request, response) => {
  const { id } = request.params;
  const user = users.find((x) => x.id === id);

  if (!user) {
    return response.status(404).send();
  }
  return response.send(user);
});

// Cadastro
server.post('/users', (request, response) => {
  try {
    const { name, email, password } = request.body as User;

    const errors: ResponseError[] = [];

    if (!name) {
      errors.push({
        field: 'name',
        message: 'Name is required!',
      });
    }

    if (!email) {
      errors.push({
        field: 'email',
        message: 'E-mail is required!',
      });
    }

    if (!emailRegex.test(email)) {
      errors.push({
        field: 'email',
        message: 'E-mail is invalid!',
      });
    }

    const userByEmail = users.find(
      (x) => x.email.toUpperCase() === email.toUpperCase()
    );

    if (userByEmail) {
      errors.push({
        field: 'email',
        message: 'E-mail is already in use!',
      });
    }

    if (!password) {
      errors.push({
        field: 'password',
        message: 'Password is required!',
      });
    }

    if (errors.length > 0) {
      return response.status(400).send(errors);
    }

    const id = v4();
    const user = {
      id,
      name,
      email,
      password,
    };

    users.push(user);
    return response.status(201).send(user);
  } catch (err) {
    return response.send({
      message: err.message,
    });
  }
});

// Edição
server.put('/users/:id', (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, password } = request.body as User;

    const errors: ResponseError[] = [];

    if (!name) {
      errors.push({
        field: 'name',
        message: 'Name is required!',
      });
    }

    if (!email) {
      errors.push({
        field: 'email',
        message: 'E-mail is required!',
      });
    }

    if (!emailRegex.test(email)) {
      errors.push({
        field: 'email',
        message: 'E-mail is invalid!',
      });
    }

    const userByEmail = users.find(
      (x) =>
        x.email.toUpperCase() === email.toUpperCase() &&
        x.id.toUpperCase() !== id.toUpperCase()
    );

    if (userByEmail) {
      errors.push({
        field: 'email',
        message: 'E-mail is already in use!',
      });
    }

    if (!password) {
      errors.push({
        field: 'password',
        message: 'Password is required!',
      });
    }

    if (errors.length > 0) {
      return response.status(400).send(errors);
    }

    const userIndex = users.findIndex((x) => x.id === id);
    const user = {
      id,
      name,
      email,
      password,
    };
    users[userIndex] = user;
    return response.send(user);
  } catch (err) {
    return response.send({
      message: err.message,
    });
  }
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
