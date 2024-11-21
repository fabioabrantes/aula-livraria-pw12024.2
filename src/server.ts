import express from 'express';
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

const clients: User[] = [];

const server = express();
server.use(express.json());
server.get('/users', (request, response) => {
  const nameHost = request.hostname;
  response.status(200).send(nameHost);
});
server.post('/users', (request, response) => {
  const dados = request.body as User;
  const user:User = {
    id: dados.id,
    cpf:dados.cpf,
    name:dados.name,
    books:[]
  }
  if(!user){
    response.status(400).json("error:usaario nao cadastrado")
  }
  response.status(200).json(user);
});

server.delete('/users', (request, response) => {
 
});
server.put('/users', (request, response) => {
 
});

server.listen("3000", () =>
  console.log("server online on port 3001")
);