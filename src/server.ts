import express from 'express';
import {v4 as geraNumeroAleatorio} from 'uuid';

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
server.use(express.json());
//lista todos os usuarios
server.get('/users', (request, response) => {
 return response.status(200).json(clients);
});
server.get('/users/:id', (request, response) => {
  const id = request.params.id;
  const user = clients.find(client => client.id === id);
  if(!user){
    return response.status(400).json("error:usuário inexistente");
  }
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
  return response.status(201).json({message:"cadastro realizado com sucesso"});
});
server.delete('/users/:id', (request, response) => {
  const id = request.params.id;
  const updatedUsers = clients.filter(client => client.id !== id);
  if(updatedUsers.length === clients.length){
    return response.status(400).json("error:usuário inexistente.");
  }
  clients = [...updatedUsers];
  return response.status(400).json({message:"usuario removido"});
});
server.put('/users/:id', (request, response) => {
  const nome = request.params.name;
  const corpo = request.body;
  return response.status(200).json({ nome, corpo });
});

// CRUD DA TABELA BOOKS

server.listen("3000", () =>
  console.log("server online on port 3000")
);