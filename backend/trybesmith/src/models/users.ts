import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUsers from '../interfaces/users';

export default class UsersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async createUser(user: IUsers): Promise<IUsers> {
    const { username, classe, level, password } = user;
    const [userCreated] = await this.connection
      .execute<ResultSetHeader>(`INSERT INTO Trybesmith.Users (username, classe, level, password)
      VALUES (?, ?, ?, ?)`, [username, classe, level, password]);
    const { insertId } = userCreated;
    return { id: insertId, ...user };
  }
}