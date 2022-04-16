import { Request, Response } from 'express';
import OrdersService from '../services/orders';

class OrdersController {
  constructor(private orderService = new OrdersService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    return res.status(200).json(orders);
  };
}

export default OrdersController;