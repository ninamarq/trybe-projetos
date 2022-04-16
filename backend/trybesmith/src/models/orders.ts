import { Pool } from 'mysql2/promise';
import IOrders from '../interfaces/orders';

export default class OrdersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrders[]> {
    const [orders] = await this.connection
      .execute('SELECT * FROM Trybesmith.Orders');
    return orders as IOrders[];
  }

  public async getProductsByOrderId(id: number): Promise<IOrders[]> {
    const [orders] = await this.connection
      .execute('SELECT id FROM Trybesmith.Products WHERE orderId = ?', [id]);
    return orders as IOrders[];
  }
}
