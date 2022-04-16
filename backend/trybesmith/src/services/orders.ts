import connection from '../models/connection';
import OrdersModel from '../models/orders';
import IOrders from '../interfaces/orders';

export default class OrdersService {
  public model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(connection);
  }

  public async getAll(): Promise<IOrders[]> {
    const orders = await this.model.getAll();
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        if (order.id) {
          // recebe todos os produtos que possuem o orderId
          const productsByOrderId = await this.model.getProductsByOrderId(order.id);
          // renova array de forma a deixa-la apenas com o valor do id, e nao [{ id: 1 }, { id: 2 }]
          const products = productsByOrderId.map((product) => product.id);
          const objResponse = { ...order, products };
          return objResponse;
        }
      }),
    );
    return ordersWithProducts as IOrders[];
  }
}
