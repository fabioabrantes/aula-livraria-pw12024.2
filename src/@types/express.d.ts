type User = {
  id: string;
  cpf: string;
  name: string;
  books: Book[];
}

declare namespace Express {
      export interface Request {
          usuario: User; // Ou o tipo específico da sua propriedade
      }
}