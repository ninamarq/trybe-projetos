import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProducts from '../interfaces/products';

export default class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProducts[]> {
    const [products] = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    return products as IProducts[];
  }

  public async postProduct(product: IProducts): Promise<IProducts> {
    const { name, amount } = product;
    const [productCreated] = await this.connection
      .execute<ResultSetHeader>(`INSERT INTO Trybesmith.Products (name, amount)
      VALUES (?, ?)`, [name, amount]);
    const { insertId } = productCreated;
    return { id: insertId, ...product };
  }
}