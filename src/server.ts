import express, { Request, Response, NextFunction } from 'express';
import { v4 as geraNumeroAleatorio } from 'uuid';

type Book = {
  id: string;
  autor: string;
  title: string;
}

type User = {
  id: string;
  cpf: string;
  name: string;
  books: Book[];
}

let clients: User[] = [];

const server = express();
server.request.usuario

server.use(express.json());

function verifyUserById(request: Request, response: Response, next: NextFunction) {
  const id = request.params.id;
  const user = clients.find(client => client.id === id);
  if (!user) {
    return response.status(400).json("error:usuário inexistente");
  }

  request.usuario = user;
  next();
}
server.put('/users/:id', verifyUserById, (request, response) => {
  const { name, cpf } = request.body;
  const user = request.usuario;
  user.cpf = cpf;
  user.name = name;
  return response.status(200).json(user);
});
//lista todos os usuarios
server.get('/users', (request, response) => {
  return response.status(200).json(clients);
});
server.get('/users/:id',verifyUserById, (request, response) => {
  const user =request.usuario;
  return response.status(200).json(user);
})
server.post('/users', (request, response) => {
  const dados = request.body as User;
  //validar numeros
  const user: User | null = {
    id: geraNumeroAleatorio(),
    cpf: dados.cpf,
    name: dados.name,
    books: []
  }
  if (!user) {
    return response.status(400).json("error:usaario nao cadastrado")
  }
  clients.push(user);
  return response.status(201).json({ message: "cadastro realizado com sucesso" });
});
server.delete('/users/:id',verifyUserById, (request, response) => {
  const user = request.usuario;
  const updatedUsers = clients.filter(client => client.id !== user.id);
  if (updatedUsers.length === clients.length) {
    return response.status(400).json("error:usuário inexistente.");
  }
  clients = [...updatedUsers];
  return response.status(400).json({ message: "usuario removido" });
});


// CRUD DA TABELA BOOKS

server.listen("3000", () =>
  console.log("server online on port 3000")
);