// Cria interface para representar o usuário no nosso sistema
interface IUsers {
  id?: number;
  username: string;
  classe: string;
  level: number;
  password: string;
}

export default IUsers;